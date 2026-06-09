import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { isRenderableSize } from '../../lib/canvas';

export interface AsciiOptions {
  characters?: string;
  fgColor?: string;
  bgColor?: string;
  invert?: boolean;
  resolution?: number;
}

/**
 * Rendu ASCII robuste de la scène R3F courante.
 *
 * Remplace `<AsciiRenderer>` de drei, qui lance `effect.render()` avant son
 * `setSize()` → `getImageData` reçoit une largeur NaN et crashe chaque frame.
 * Ici on ne rend que lorsque la taille est exploitable (cf. {@link isRenderableSize}),
 * après `setSize`.
 */
export function useAsciiEffect({
  characters = ' .:-=+*#%@',
  fgColor = '#eaeaea',
  bgColor = '#000000',
  invert = true,
  resolution = 0.16,
}: AsciiOptions = {}): void {
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
    if (isRenderableSize(size.width, size.height)) {
      effect.setSize(size.width, size.height);
      sized.current = true;
    }
  }, [effect, size]);

  // renderIndex 1 → prend la main sur la boucle de rendu.
  useFrame(() => {
    if (sized.current) effect.render(scene, camera);
  }, 1);
}
