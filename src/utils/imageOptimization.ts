/**
 * Image optimization utilities for responsive images and lazy loading
 * Reduces bandwidth and improves Core Web Vitals
 */

/**
 * Génère un srcSet optimisé pour les tech icons (affichage 60x60)
 * Servi en 1x et 2x pour DPI adapté
 * @param basePath - Chemin de base sans extension (ex: /react)
 * @returns srcSet string pour les attributs img
 */
export const generateTechIconSrcSet = (basePath: string): string => {
  return `${basePath}.webp 1x, ${basePath}.webp 2x`;
};

/**
 * Génère un srcSet avec tailles multiples pour responsive images
 * @param basePath - Chemin de base sans extension
 * @param sizes - Array de largeurs en pixels
 * @returns srcSet string pour attribut img
 */
export const generateResponsiveSrcSet = (
  basePath: string,
  sizes: number[] = [400, 800, 1200]
): string => {
  return sizes.map((size) => `${basePath}-${size}w.webp ${size}w`).join(", ");
};

/**
 * Génère l'attribut sizes pour responsive images (mobile-first)
 * @param isMobile - Si true, optimisé pour mobile
 * @returns sizes string pour attribut img
 */
export const generateSizes = (isMobile = false): string => {
  if (isMobile) {
    return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
  }
  return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px";
};

/**
 * Optimisation config pour tech icons affichés à 60x60
 */
export const TECH_ICON_CONFIG = {
  width: 60,
  height: 60,
  sizes: "60px", // Largeur fixe
  srcSet: (path: string) => `${path}.webp 1x, ${path}.webp 2x`,
};

/**
 * Optimisation config pour images de projet
 */
export const PROJECT_IMAGE_CONFIG = {
  sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px",
  srcSet: (path: string) =>
    `${path}-400w.webp 400w, ${path}-800w.webp 800w, ${path}-1200w.webp 1200w`,
};
