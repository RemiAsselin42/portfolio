/**
 * Parsing de couleur CSS → triplet RGB normalisé [0, 1] — logique pure, testée.
 *
 * Sert à passer la couleur calculée d'un élément (`getComputedStyle(el).color`,
 * toujours sous forme `rgb()`/`rgba()`) à l'uniform `uTint` du shader, pour que
 * l'effet « shaderise » garde la couleur réelle du texte. Gère aussi le hex pour
 * robustesse / tests.
 */

/** Triplet RGB, chaque composante dans [0, 1]. */
export type Vec3 = [number, number, number];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Convertit une couleur CSS en triplet RGB [0, 1]. Formes acceptées :
 * `rgb(r,g,b)`, `rgba(r,g,b,a)` (alpha ignoré), `#rgb`, `#rrggbb`.
 * Retourne `fallback` (blanc par défaut) si la chaîne est inintelligible.
 */
export function cssColorToVec3(input: string, fallback: Vec3 = [1, 1, 1]): Vec3 {
  const s = input.trim().toLowerCase();

  const rgb = s.match(/^rgba?\(([^)]+)\)$/);
  if (rgb) {
    const parts = rgb[1].split(/[,/\s]+/).filter(Boolean);
    if (parts.length >= 3) {
      const c = parts.slice(0, 3).map((p) => clamp01(parseFloat(p) / 255));
      if (c.every((n) => Number.isFinite(n))) return [c[0], c[1], c[2]];
    }
    return fallback;
  }

  const hex = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (hex) {
    const h = hex[1];
    const full = h.length === 3 ? [...h].map((d) => d + d).join('') : h;
    const num = parseInt(full, 16);
    return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
  }

  return fallback;
}
