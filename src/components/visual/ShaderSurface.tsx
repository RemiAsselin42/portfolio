import { Canvas } from '@react-three/fiber';
import type { CSSProperties } from 'react';
import type * as THREE from 'three';
import type { ShaderMode } from '../../lib/shader';
import type { Vec3 } from '../../lib/color';
import { useShaderPass, type ShaderPassOptions } from './useShaderPass';

/** Branche le pass sur le contexte WebGL (le hook ne rend rien lui-même). */
function Pass(props: ShaderPassOptions) {
  useShaderPass(props);
  return null;
}

export interface ShaderSurfaceProps {
  /** Texture source (cf. `captureElement` : texte → canvas, image → URL). */
  texture: THREE.Texture;
  /** Mode de rendu GLSL. Défaut : `'ascii'`. */
  mode?: ShaderMode;
  /** Glitch : `false` | `true` (auto) | intensité [0, 1]. Défaut : `false`. */
  glitch?: boolean | number;
  /** Résolution de pixelisation = nombre de cellules sur la largeur. L'emporte sur `grid`. */
  resolution?: number;
  /** Taille de cellule en px (override avancé si `resolution` absent). Défaut : 8. */
  grid?: number;
  /** Teinte de sortie (couleur de l'élément). `null` → couleur source. */
  tint?: Vec3 | null;
  /** Alpha piloté par la luminance (transparent hors silhouette). Défaut : `true`. */
  alphaFromLuma?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Surface réutilisable « applyShader » en déclaratif : un contexte WebGL
 * transparent qui rend `texture` via le pass paramétré par `mode` + `glitch`.
 * Décoratif (`aria-hidden`) et `pointer-events: none` → n'intercepte pas les
 * clics, l'élément réel dessous reste sélectionnable/accessible.
 */
export function ShaderSurface({
  texture,
  mode = 'ascii',
  glitch = false,
  resolution,
  grid = 8,
  tint = null,
  alphaFromLuma = true,
  className,
  style,
}: ShaderSurfaceProps) {
  return (
    <Canvas
      className={className}
      style={{ pointerEvents: 'none', ...style }}
      aria-hidden="true"
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: 'high-performance' }}
    >
      <Pass
        texture={texture}
        mode={mode}
        glitch={glitch}
        resolution={resolution}
        grid={grid}
        tint={tint}
        alphaFromLuma={alphaFromLuma}
      />
    </Canvas>
  );
}
