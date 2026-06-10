import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ShaderMode } from '../../lib/shader';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { captureElement, type ElementCapture } from './elementTexture';
import { ShaderSurface } from './ShaderSurface';

export interface ShaderizeProps {
  /** Sélecteur CSS de l'élément à « shaderiser » : texte (h1, p, a…) ou `<img>`. */
  selector: string;
  /** Mode de rendu GLSL. Défaut : `'squares'`. */
  mode?: ShaderMode;
  /** Glitch : `false` | `true` (auto) | intensité [0, 1]. Défaut : `true`. */
  glitch?: boolean | number;
  /** Résolution de pixelisation = nombre de cellules sur la largeur. L'emporte sur `grid`. */
  resolution?: number;
  /** Taille de cellule en px (override avancé si `resolution` absent). Défaut : 8. */
  grid?: number;
  /** Sur-échantillonnage de la capture (netteté). Défaut : 2. */
  supersample?: number;
}

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** Rend `el` positionné (pour ancrer l'overlay absolu) ; renvoie la fonction de restauration. */
function ensurePositioned(el: HTMLElement): () => void {
  if (getComputedStyle(el).position !== 'static') return () => {};
  const prev = el.style.position;
  el.style.position = 'relative';
  return () => {
    el.style.position = prev;
  };
}

/** Boîte de `el` relative à `parentEl` (en tenant compte du scroll). */
function measureBox(el: HTMLElement, parentEl: HTMLElement): Box {
  const r = el.getBoundingClientRect();
  const pr = parentEl.getBoundingClientRect();
  return {
    left: r.left - pr.left + parentEl.scrollLeft,
    top: r.top - pr.top + parentEl.scrollTop,
    width: r.width,
    height: r.height,
  };
}

interface Hider {
  /** Masque l'élément original (glyphes / image) tout en gardant sa boîte. */
  conceal(): void;
  /** Restaure l'état d'origine. */
  reveal(): void;
}

/**
 * Masque l'original sans casser la mise en page : `opacity:0` pour une `<img>`,
 * `color:transparent` pour du texte (préserve la sélection + les lecteurs d'écran).
 */
function makeHider(el: HTMLElement): Hider {
  const isImg = el instanceof HTMLImageElement;
  const prop = isImg ? 'opacity' : 'color';
  const hidden = isImg ? '0' : 'transparent';
  const prev = el.style.getPropertyValue(prop);
  return {
    conceal: () => el.style.setProperty(prop, hidden),
    reveal: () => (prev ? el.style.setProperty(prop, prev) : el.style.removeProperty(prop)),
  };
}

/** Révèle l'élément le temps de la capture (couleur réelle / mesure), capture, re-masque. */
function captureAndMeasure(
  el: HTMLElement,
  parentEl: HTMLElement,
  supersample: number,
  hider: Hider,
): { capture: ElementCapture; box: Box } {
  hider.reveal();
  const capture = captureElement(el, supersample);
  hider.conceal();
  return { capture, box: measureBox(el, parentEl) };
}

/**
 * Installe l'overlay : positionne le parent, masque l'original, capture + mesure
 * (maintenant, au resize, et au chargement des polices pour le texte), pousse le
 * résultat via `onData`. Renvoie le nettoyage (restaure tout, libère les textures).
 */
function mountShaderize(
  el: HTMLElement,
  supersample: number,
  onData: (data: { capture: ElementCapture; box: Box }) => void,
): () => void {
  const parentEl = el.parentElement;
  if (!parentEl) return () => {};

  const hider = makeHider(el);
  const restorePos = ensurePositioned(parentEl);
  let alive = true;
  let current: ElementCapture | null = null;

  const recapture = () => {
    if (!alive) return;
    const data = captureAndMeasure(el, parentEl, supersample, hider);
    current?.texture.dispose();
    current = data.capture;
    onData(data);
  };

  recapture();
  // Métriques de police fiables une fois les webfonts chargées (texte uniquement).
  if (!(el instanceof HTMLImageElement)) document.fonts?.ready.then(recapture);
  const ro = new ResizeObserver(recapture);
  ro.observe(el);
  window.addEventListener('resize', recapture);

  return () => {
    alive = false;
    ro.disconnect();
    window.removeEventListener('resize', recapture);
    hider.reveal();
    restorePos();
    current?.texture.dispose();
  };
}

/**
 * Applique l'effet « shaderise » **en place** sur un élément (texte ou `<img>`),
 * sans toucher au markup : cible `selector`, le capture en texture (texte → canvas
 * exact police/style ; image → URL chargée), superpose un `<canvas>` transparent
 * pile sur sa boîte et le rend en `mode` + `glitch`.
 *
 * - L'élément réel est conservé (SSR, SEO, lecteurs d'écran) ; il est juste masqué
 *   (texte → `color: transparent`, image → `opacity: 0`) — la boîte reste intacte.
 * - Le canvas est `aria-hidden` + `pointer-events: none` : l'original reste dessous.
 * - `prefers-reduced-motion` → aucun overlay, l'élément normal s'affiche.
 *
 * Sources : texte (fast-path exact) et image (`TextureLoader`). HTML arbitraire
 * (dégradés, enfants) = roadmap.
 */
export default function Shaderize({
  selector,
  mode = 'squares',
  glitch = true,
  resolution,
  grid = 8,
  supersample = 2,
}: ShaderizeProps) {
  const reduced = usePrefersReducedMotion();
  const [parent, setParent] = useState<HTMLElement | null>(null);
  const [data, setData] = useState<{ capture: ElementCapture; box: Box } | null>(null);
  const elRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(selector);
    elRef.current = el;
    setParent(el?.parentElement ?? null);
  }, [selector]);

  useEffect(() => {
    const el = elRef.current;
    if (!el || !parent || reduced) return;
    return mountShaderize(el, supersample, setData);
  }, [parent, reduced, supersample]);

  if (reduced || !parent || !data) return null;

  const { capture, box } = data;
  return createPortal(
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
        pointerEvents: 'none',
      }}
    >
      <ShaderSurface
        texture={capture.texture}
        tint={capture.tint}
        mode={mode}
        glitch={glitch}
        resolution={resolution}
        grid={grid}
      />
    </div>,
    parent,
  );
}
