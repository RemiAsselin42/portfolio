import { useEffect, useState, RefObject } from "react";

/**
 * Hook personnalisé pour lazy load les vidéos avec Intersection Observer
 * Détermine quand une vidéo entre dans le viewport et déclenche son chargement
 */
export const useVideoLazyLoad = (
  containerRef: RefObject<HTMLElement | null>
) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Si l'Intersection Observer n'est pas supporté, charger immédiatement
    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Charger quand 50% de la vidéo est visible
          if (entry.isIntersecting) {
            setShouldLoad(true);
            // Désobserver après le premier chargement
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5, // Déclencher quand 50% est visible
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  return { shouldLoad };
};
