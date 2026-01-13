import { useState, useEffect } from "react";

/**
 * Calcule le nombre optimal de formes d'arrière-plan selon la largeur d'écran
 * @param width - Largeur de la fenêtre en pixels
 * @returns Nombre de formes à afficher
 */
const calculateShapesCount = (width: number): number => {
  if (width >= 3440) {
    return 12;
  } else if (width >= 1920) {
    return Math.round(5 + (width - 1920) * (7 / (3440 - 1920)));
  } else if (width >= 992) {
    return Math.round(2 + (width - 992) * (5 / (1920 - 992)));
  } else {
    return Math.max(0, Math.round(2 + (width / 992) * 3));
  }
};

/**
 * Hook pour gérer dynamiquement le nombre de formes d'arrière-plan
 * en fonction de la taille de l'écran avec debouncing
 * @param debounceDelay - Délai de debounce en ms (défaut: 300ms)
 * @returns Nombre de formes à afficher
 */
export const useBackgroundShapes = (debounceDelay: number = 300): number => {
  const [shapesCount, setShapesCount] = useState<number>(() =>
    calculateShapesCount(window.innerWidth)
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShapesCount(calculateShapesCount(window.innerWidth));
      }, debounceDelay);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [debounceDelay]);

  return shapesCount;
};
