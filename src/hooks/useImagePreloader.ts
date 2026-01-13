import { useEffect } from "react";

/**
 * Hook pour précharger les images en arrière-plan
 * Améliore la performance en chargeant les images avant qu'elles ne soient affichées
 *
 * @param images - Tableau de chemins d'images à précharger
 *
 * @example
 * ```typescript
 * useImagePreloader(['/hero.webp', '/logo.png']);
 * ```
 */
export const useImagePreloader = (images: string[]) => {
  useEffect(() => {
    if (!images || images.length === 0) return;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);
};
