import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';
import { isRenderableSize } from '../../lib/canvas';
import { modeToUniform, resolveCellSize, type ShaderMode } from '../../lib/shader';
import { createGlitchEnvelope, resolveGlitchIntensity, type GlitchEnvelope } from '../../lib/glitch';
import type { Vec3 } from '../../lib/color';
import { makeAsciiAtlas } from './asciiAtlas';
import { SHADER_VERT, SHADER_FRAG } from './shaders';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export interface ShaderPassOptions {
  /** Texture source (silhouette blanc-sur-noir pour le texte). */
  texture: THREE.Texture;
  /** Mode de rendu : `'ascii'` | `'dots'` | `'squares'`. */
  mode?: ShaderMode;
  /** Glitch : `false` (off), `true` (auto, façon peonia), ou intensité [0, 1]. */
  glitch?: boolean | number;
  /** Résolution de pixelisation = nombre de cellules sur la largeur. L'emporte sur `grid`. */
  resolution?: number;
  /** Taille d'une cellule en px CSS (override avancé si `resolution` absent). Défaut : 8. */
  grid?: number;
  /** Teinte de sortie (couleur réelle de l'élément). `null` → couleur source. */
  tint?: Vec3 | null;
  /** Alpha piloté par la luminance source (transparent hors silhouette). Défaut : `true`. */
  alphaFromLuma?: boolean;
}

/**
 * Applique le pass GLSL « shaderise » : un quad plein écran échantillonne
 * directement `texture` (source statique) et la rend en ASCII / dots / squares,
 * avec glitch optionnel et sortie en alpha prémultiplié (compositing en place).
 *
 * Pas de scène 3D ni de cible hors-écran : la source est une texture, donc le
 * quad la lit directement. Un seul contexte WebGL, scalable à N éléments.
 *
 * `prefers-reduced-motion` → temps et glitch gelés (image statique).
 */
export function useShaderPass({
  texture,
  mode = 'ascii',
  glitch = false,
  resolution,
  grid = 8,
  tint = null,
  alphaFromLuma = true,
}: ShaderPassOptions): void {
  const { gl, size } = useThree();
  const reduced = usePrefersReducedMotion();

  // Props lues au frame via refs → pas de re-création des objets GPU.
  const modeRef = useRef(mode);
  const glitchRef = useRef(glitch);
  const reducedRef = useRef(reduced);
  modeRef.current = mode;
  glitchRef.current = glitch;
  reducedRef.current = reduced;

  const atlas = useMemo(() => makeAsciiAtlas(), []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: SHADER_VERT,
      fragmentShader: SHADER_FRAG,
      transparent: true,
      premultipliedAlpha: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uSource: { value: texture },
        uAscii: { value: atlas.texture },
        uAsciiCount: { value: atlas.count },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uGrid: { value: grid },
        uMode: { value: modeToUniform(mode) },
        uTime: { value: 0 },
        uGlitch: { value: 0 },
        uTint: { value: new THREE.Vector3(1, 1, 1) },
        uUseTint: { value: 0 },
        uAlphaFromLuma: { value: 1 },
      },
    });
    // Création unique : tout est ensuite piloté par les uniforms (cf. useFrame + effets).
  }, [atlas]);

  const quad = useMemo(() => new FullScreenQuad(material), [material]);
  const envelope = useMemo<GlitchEnvelope>(() => createGlitchEnvelope(), []);

  // Source (change quand l'élément est re-capturé : resize, police chargée…).
  useEffect(() => {
    material.uniforms.uSource.value = texture;
  }, [material, texture]);

  // Teinte : présente → on l'utilise, sinon couleur source.
  useEffect(() => {
    const u = material.uniforms;
    if (tint) {
      u.uTint.value.set(tint[0], tint[1], tint[2]);
      u.uUseTint.value = 1;
    } else {
      u.uUseTint.value = 0;
    }
  }, [material, tint]);

  useEffect(() => {
    material.uniforms.uAlphaFromLuma.value = alphaFromLuma ? 1 : 0;
  }, [material, alphaFromLuma]);

  // Résolution en px CSS → densité de cellules indépendante du DPR.
  useEffect(() => {
    if (!isRenderableSize(size.width, size.height)) return;
    material.uniforms.uResolution.value.set(size.width, size.height);
    // Taille de cellule dérivée de `resolution` (colonnes) ou `grid` (px).
    material.uniforms.uGrid.value = resolveCellSize(size.width, resolution, grid);
  }, [material, size, resolution, grid]);

  useEffect(() => {
    return () => {
      quad.dispose();
      material.dispose();
      atlas.texture.dispose();
    };
  }, [quad, material, atlas]);

  // renderIndex 1 → prend la main sur la boucle (rendu auto de R3F désactivé).
  useFrame((_, delta) => {
    const u = material.uniforms;
    const frozen = reducedRef.current;
    u.uMode.value = modeToUniform(modeRef.current);
    if (!frozen) u.uTime.value += delta;
    u.uGlitch.value = frozen ? 0 : resolveGlitchIntensity(glitchRef.current, envelope, delta);
    quad.render(gl);
  }, 1);
}
