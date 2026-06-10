/**
 * Contrat des modes de rendu du shader — logique pure, testée unitairement.
 *
 * Le pass GLSL (cf. `src/components/visual/shaders.ts`) sélectionne un mode via
 * un uniform entier `uMode`. Ce module est l'unique source de vérité du mapping
 * nom ↔ entier, partagée entre l'API React et le shader, pour éviter qu'un index
 * magique ne dérive d'un côté ou de l'autre.
 *
 * Repris du prototype `peoniap5` (renderer.js : ASCII=0, dots=1, squares=2), mais
 * porté côté GPU au lieu du dessin per-cellule CPU.
 */

/** Modes disponibles, dans l'ordre de leur index uniform (`ascii`=0, …). */
export const SHADER_MODES = ['ascii', 'dots', 'squares'] as const;

/** Type d'un mode de rendu valide. */
export type ShaderMode = (typeof SHADER_MODES)[number];

/**
 * Index uniform d'un mode, tel qu'attendu par `uMode` dans le fragment shader.
 * L'index est la position dans {@link SHADER_MODES} → garanti unique et stable.
 */
export function modeToUniform(mode: ShaderMode): number {
  return SHADER_MODES.indexOf(mode);
}

/** Garde de type : `true` si `value` est un {@link ShaderMode} connu. */
export function isShaderMode(value: unknown): value is ShaderMode {
  return typeof value === 'string' && (SHADER_MODES as readonly string[]).includes(value);
}

/** Taille de cellule minimale en px (en deçà, la pixelisation n'a plus de sens). */
export const MIN_CELL = 2;

/**
 * Résout la taille de cellule en px (uniform `uGrid`) qui pilote la résolution
 * de pixelisation. Deux expressions, `resolution` l'emporte :
 * - `resolution` (nb de colonnes) → `width / resolution` : densité cohérente
 *   quelle que soit la taille de l'élément.
 * - sinon `grid` (px absolus) : override précis.
 *
 * Clampé à {@link MIN_CELL}.
 *
 * @param width Largeur de la surface en px CSS.
 * @param resolution Nombre de cellules sur la largeur (ignoré si ≤ 0 / absent).
 * @param grid Taille de cellule en px (repli / override).
 */
export function resolveCellSize(width: number, resolution: number | undefined, grid: number): number {
  const px = resolution && resolution > 0 ? width / resolution : grid;
  return Math.max(MIN_CELL, px);
}
