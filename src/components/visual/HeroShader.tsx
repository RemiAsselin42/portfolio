import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Dessine le texte (blanc sur noir, aligné à gauche) dans un canvas 2D hors-écran
 * et en fait une texture. La police système monospace évite toute requête externe
 * (RGPD). C'est cette texture qui sera « shaderisée » en ASCII.
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
    ctx.font = `700 ${fontSize}px "Courier New", ui-monospace, monospace`;
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
  const texture = useMemo(() => makeTextTexture(text), [text]);

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

/**
 * Rendu ASCII robuste (remplace le `<AsciiRenderer>` de drei, qui appelle
 * `effect.render()` avant son `setSize()` → `getImageData` reçoit une largeur
 * NaN et crashe à chaque frame).
 *
 * Ici on ne rend QUE lorsque la taille est finie et > 0, après `setSize`.
 */
function Ascii({
  text,
  characters = ' .:-=+*#%@',
  fgColor = '#eaeaea',
  bgColor = '#000000',
  invert = false,
  resolution = 0.16,
}: {
  text: string;
  characters?: string;
  fgColor?: string;
  bgColor?: string;
  invert?: boolean;
  resolution?: number;
}) {
  const { gl, scene, camera, size } = useThree();
  const sized = useRef(false);

  const effect = useMemo(() => {
    const e = new AsciiEffect(gl, characters, { invert, resolution });
    e.domElement.style.position = 'absolute';
    e.domElement.style.top = '0';
    e.domElement.style.left = '0';
    e.domElement.style.pointerEvents = 'none';
    return e;
  }, [gl, characters, invert, resolution]);

  useLayoutEffect(() => {
    effect.domElement.style.color = fgColor;
    effect.domElement.style.backgroundColor = bgColor;
  }, [effect, fgColor, bgColor]);

  useEffect(() => {
    const parent = gl.domElement.parentNode;
    gl.domElement.style.opacity = '0';
    parent?.appendChild(effect.domElement);
    return () => {
      gl.domElement.style.opacity = '1';
      effect.domElement.parentNode?.removeChild(effect.domElement);
      sized.current = false;
    };
  }, [gl, effect]);

  useEffect(() => {
    if (
      Number.isFinite(size.width) &&
      Number.isFinite(size.height) &&
      size.width > 0 &&
      size.height > 0
    ) {
      effect.setSize(size.width, size.height);
      sized.current = true;
    }
  }, [effect, size]);

  // renderIndex 1 → prend la main sur la boucle de rendu (comme AsciiRenderer).
  useFrame(() => {
    if (sized.current) effect.render(scene, camera);
  }, 1);

  return null;
}

/**
 * Îlot React (client:only) : effet ASCII appliqué au texte du hero.
 *
 * - `prefers-reduced-motion` ou avant montage → renvoie `null`, le <h1> SSR
 *   (sous le canvas) reste visible : fallback accessible et SEO-friendly.
 * - Décoratif → conteneur `aria-hidden`.
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
        <Ascii text={text} />
      </Canvas>
    </div>
  );
}
