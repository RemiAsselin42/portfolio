import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { useAsciiEffect } from './useAsciiEffect';

const TITLE_FONT = '"Fraunces Variable", Georgia, serif';

/**
 * Dessine le texte (blanc sur noir, aligné à gauche) dans un canvas 2D hors-écran
 * et en fait une texture. Police de titre (Fraunces, self-hostée) → la silhouette
 * « shaderisée » en ASCII suit les lettres du titre.
 */
function makeTextTexture(text: string): THREE.CanvasTexture {
  const w = 1600;
  const h = 900;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  const pad = w * 0.06;
  let fontSize = 240;
  const measure = () => {
    ctx.font = `700 ${fontSize}px ${TITLE_FONT}`;
    return ctx.measureText(text).width;
  };
  while (measure() > w - pad * 2 && fontSize > 12) fontSize -= 4;
  ctx.fillText(text, pad, h / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

function TextPlane({ text }: { text: string }) {
  const { viewport } = useThree();
  const mesh = useRef<THREE.Mesh>(null);
  const [fontReady, setFontReady] = useState(false);

  // Génère la texture seulement quand Fraunces est prête, sinon on dessinerait
  // avec la police de repli (serif système) avant le swap.
  useEffect(() => {
    let alive = true;
    const done = () => alive && setFontReady(true);
    document.fonts?.load(`700 240px ${TITLE_FONT}`).then(done, done);
    return () => {
      alive = false;
    };
  }, []);

  const texture = useMemo(() => makeTextTexture(text), [text, fontReady]);
  useEffect(() => () => texture.dispose(), [texture]);

  const aspect = texture.image.width / texture.image.height;
  const planeHeight = viewport.height;
  const planeWidth = planeHeight * aspect;

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.position.x = Math.sin(t * 0.2) * 0.05;
    mesh.current.position.y = Math.cos(t * 0.16) * 0.03;
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

/** Couche ASCII : le rendu est pris en charge par useAsciiEffect sur la scène courante. */
function AsciiLayer() {
  useAsciiEffect();
  return null;
}

/**
 * Îlot React (client:only) : effet ASCII appliqué au texte du hero.
 *
 * - `prefers-reduced-motion` ou avant montage → renvoie `null`, le <h1> SSR
 *   (sous le canvas) reste visible : fallback accessible et SEO-friendly.
 * - Décoratif → conteneur `aria-hidden`.
 * - `invert` (dans useAsciiEffect) : ce sont les LETTRES qui portent les glyphes
 *   denses, pas le fond (négatif de l'effet).
 *
 * NOTE perf : conversion CPU → DOM, parfaite pour ce hero unique. Pour appliquer
 * l'effet à de nombreux éléments, porter en post-processing GLSL (un seul
 * contexte WebGL) — voir la roadmap du README.
 */
export default function HeroShader({ text }: { text: string }) {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  if (!ready || reduced) return null;

  return (
    <div className="hero__canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <color attach="background" args={['#000000']} />
        <TextPlane text={text} />
        <AsciiLayer />
      </Canvas>
    </div>
  );
}
