import { useState, useCallback } from "react";

export type AnimationStage =
  | "fade-in"
  | "fade-out"
  | "reset-position"
  | "left-fade-out"
  | "left-reset-position"
  | "left-fade-in";

// Breakpoint constant for responsive behavior
const MOBILE_BREAKPOINT = 992;

interface UsePageTransitionOptions {
  totalPages: number;
  onTransitionComplete?: (newPage: number) => void;
}

/**
 * Hook personnalisé pour gérer les transitions de pages avec animations
 * @param options - Options de configuration
 * @param options.totalPages - Nombre total de pages dans l'application
 * @param options.onTransitionComplete - Callback appelé après chaque transition
 * @returns Object contenant l'état de la page et les fonctions de navigation
 */
export const usePageTransition = ({
  totalPages,
  onTransitionComplete,
}: UsePageTransitionOptions) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [animationStage, setAnimationStage] =
    useState<AnimationStage>("fade-in");

  /**
   * Effectue une transition vers une nouvelle page avec animation
   * @param newPage - Index de la page cible (0-based)
   */
  const transitionToPage = useCallback(
    (newPage: number) => {
      // Validation des limites
      if (newPage < 0 || newPage >= totalPages) {
        return;
      }

      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const transitionDuration = isMobile ? 300 : 500;

      // Animation vers la gauche (retour en arrière)
      if (newPage < currentPage) {
        setAnimationStage("left-fade-out");
        setTimeout(() => {
          setAnimationStage("left-reset-position");
          setCurrentPage(newPage);
          setTimeout(() => {
            setAnimationStage("left-fade-in");
            // Announce page transition to screen readers
            const announcementElement = document.getElementById(
              "page-transition-announcement"
            );
            if (announcementElement) {
              announcementElement.textContent = `Page ${
                newPage + 1
              } sur ${totalPages}, chargée`;
            }
            onTransitionComplete?.(newPage);
          }, 20);
        }, transitionDuration);
      }
      // Animation vers la droite (avancer)
      else if (newPage > currentPage) {
        setAnimationStage("fade-out");
        setTimeout(() => {
          setAnimationStage("reset-position");
          setCurrentPage(newPage);
          setTimeout(() => {
            setAnimationStage("fade-in");
            // Announce page transition to screen readers
            const announcementElement = document.getElementById(
              "page-transition-announcement"
            );
            if (announcementElement) {
              announcementElement.textContent = `Page ${
                newPage + 1
              } sur ${totalPages}, chargée`;
            }
            onTransitionComplete?.(newPage);
          }, 20);
        }, transitionDuration);
      }
    },
    [currentPage, totalPages, onTransitionComplete]
  );

  /**
   * Navigue vers la page suivante si disponible
   */
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      transitionToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, transitionToPage]);

  /**
   * Navigue vers la page précédente si disponible
   */
  const goToPreviousPage = useCallback(() => {
    if (currentPage > 0) {
      transitionToPage(currentPage - 1);
    }
  }, [currentPage, transitionToPage]);

  /**
   * Navigue directement vers la page d'accueil (index 0)
   */
  const goToHomePage = useCallback(() => {
    transitionToPage(0);
  }, [transitionToPage]);

  /**
   * Navigue directement vers la dernière page (page de contact)
   */
  const goToContactPage = useCallback(() => {
    transitionToPage(totalPages - 1);
  }, [totalPages, transitionToPage]);

  return {
    currentPage,
    animationStage,
    transitionToPage,
    goToNextPage,
    goToPreviousPage,
    goToHomePage,
    goToContactPage,
    canGoNext: currentPage < totalPages - 1,
    canGoPrevious: currentPage > 0,
  };
};
