import * as THREE from 'three';
import { cssColorToVec3, type Vec3 } from '../../lib/color';

export interface ElementCapture {
  /** Texture source (silhouette texte blanc-sur-noir, ou image telle quelle). */
  texture: THREE.Texture;
  /** Couleur d'élément pour `uTint` (texte) ; `null` → couleur source (image). */
  tint: Vec3 | null;
  /** Largeur de la boîte de l'élément en px CSS. */
  width: number;
  /** Hauteur de la boîte de l'élément en px CSS. */
  height: number;
}

/** `parseFloat` tolérant : renvoie 0 pour `''`/`'normal'`/NaN. */
const px = (value: string): number => parseFloat(value) || 0;

/** Mappe `text-align` CSS sur l'alignement canvas + le `x` d'ancrage dans la boîte de contenu. */
function anchorX(textAlign: string, left: number, right: number): { align: CanvasTextAlign; x: number } {
  switch (textAlign) {
    case 'center':
      return { align: 'center', x: (left + right) / 2 };
    case 'right':
    case 'end':
      return { align: 'right', x: right };
    default:
      return { align: 'left', x: left };
  }
}

/**
 * Configure le contexte 2D (police, interlettrage, alignement) d'après le style
 * calculé et renvoie le `x` d'ancrage du texte dans la boîte. Isolé pour garder
 * {@link captureTextElement} linéaire.
 */
function applyTextStyle(ctx: CanvasRenderingContext2D, cs: CSSStyleDeclaration, width: number): number {
  ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  if (cs.letterSpacing && cs.letterSpacing !== 'normal') {
    ctx.letterSpacing = cs.letterSpacing;
  }
  const { align, x } = anchorX(cs.textAlign, px(cs.paddingLeft), width - px(cs.paddingRight));
  ctx.textAlign = align;
  return x;
}

/**
 * Capture un élément **texte** en texture exacte, façon « fast-path » : on lit son
 * `textContent` et son style calculé (police, graisse, casse, interlettrage,
 * alignement, couleur) puis on le redessine en blanc sur noir dans un canvas 2D.
 *
 * Pourquoi exact : le canvas 2D utilise les MÊMES polices que la page (contrairement
 * à un snapshot `foreignObject`), donc la silhouette colle pixel-près au texte rendu.
 *
 * Limite assumée : pensé pour du texte sur une ligne (titres, liens, boutons). Le
 * HTML arbitraire (dégradés, images, enfants) n'est pas géré — voir la roadmap.
 *
 * @param el Élément à capturer (doit être monté et mesuré).
 * @param supersample Sur-échantillonnage pour la netteté. Défaut : 2.
 */
function captureTextElement(el: HTMLElement, supersample = 2): ElementCapture {
  const rect = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width * supersample);
  canvas.height = Math.round(height * supersample);
  const ctx = canvas.getContext('2d')!;
  ctx.scale(supersample, supersample);

  // Fond noir = « vide » pour le shader (luma 0 → transparent) ; texte blanc = silhouette pleine.
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = 'middle';
  const x = applyTextStyle(ctx, cs, width);
  ctx.fillText(el.textContent ?? '', x, height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return { texture, tint: cssColorToVec3(cs.color), width, height };
}

/**
 * Capture une **image** : charge son URL directement en texture (pas de lecture
 * de pixels DOM). `TextureLoader` gère le CORS (`anonymous`) ; en cas d'échec la
 * texture reste vide sans planter (contrairement à un `drawImage` qui tainterait
 * le canvas). `tint: null` → le shader garde les couleurs de l'image.
 *
 * @param el Élément `<img>` (sa boîte sert au dimensionnement de l'overlay).
 */
function captureImageElement(el: HTMLImageElement): ElementCapture {
  const rect = el.getBoundingClientRect();
  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin('anonymous');
  const texture = loader.load(el.currentSrc || el.src);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return { texture, tint: null, width: Math.max(1, rect.width), height: Math.max(1, rect.height) };
}

/** Capture polymorphe : `<img>` → {@link captureImageElement}, sinon {@link captureTextElement}. */
export function captureElement(el: HTMLElement, supersample = 2): ElementCapture {
  return el instanceof HTMLImageElement ? captureImageElement(el) : captureTextElement(el, supersample);
}
