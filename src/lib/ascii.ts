/**
 * Logique de mapping ASCII partagée — fonctions pures, testées unitairement.
 * Réutilise la même approche que le prototype `peoniap5` : luminance Rec. 601
 * puis sélection d'un glyphe dans une rampe ordonnée du plus sombre au plus clair.
 */

/** Rampe de glyphes, du plus sombre (espace) au plus clair (@). */
export const ASCII_RAMP = ' .:-=+*#%@';

/**
 * Luminance perçue à partir de composantes RGB 0–255, normalisée dans [0, 1].
 * Poids Rec. 601 (sensibilité de l'œil : vert >> rouge > bleu).
 */
export function luma(r: number, g: number, b: number): number {
  return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
}

/**
 * Associe une luminosité [0, 1] à un glyphe de la rampe.
 * Les valeurs hors bornes sont clampées.
 *
 * @param brightness Luminosité dans [0, 1] (clampée sinon).
 * @param ramp Rampe ordonnée sombre → clair (défaut : {@link ASCII_RAMP}).
 */
export function glyphForBrightness(brightness: number, ramp: string = ASCII_RAMP): string {
  const t = Math.min(1, Math.max(0, brightness));
  const index = Math.min(ramp.length - 1, Math.floor(t * ramp.length));
  return ramp[index];
}
