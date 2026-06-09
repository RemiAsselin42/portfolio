/**
 * Vrai si `(w, h)` forment une taille de rendu exploitable : finie et > 0.
 * Garde-fou avant tout `getImageData` / `setSize` (une largeur NaN fait crasher
 * `CanvasRenderingContext2D.getImageData`).
 */
export function isRenderableSize(w: number, h: number): boolean {
  return Number.isFinite(w) && Number.isFinite(h) && w > 0 && h > 0;
}
