import { TouchEvent, useState } from "react";

interface SwipeInput {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

/**
 * Hook pour détecter les gestes de swipe sur écrans tactiles
 * Filtre automatiquement les swipes verticaux pour éviter les faux positifs
 *
 * @param options - Configuration du swipe
 * @param options.onSwipeLeft - Callback appelé lors d'un swipe vers la gauche
 * @param options.onSwipeRight - Callback appelé lors d'un swipe vers la droite
 * @param options.threshold - Distance minimale en pixels pour déclencher (défaut: 50)
 * @returns Handlers d'événements touch à attacher à l'élément cible
 *
 * @example
 * ```typescript
 * const swipeHandlers = useSwipe({
 *   onSwipeLeft: () => nextPage(),
 *   onSwipeRight: () => prevPage(),
 * });
 *
 * <div {...swipeHandlers}>Swipeable content</div>
 * ```
 */
export const useSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: SwipeInput): SwipeOutput => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchEndY(null);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !touchStartY || !touchEndY) return;

    const distanceX = touchStart - touchEnd;
    const distanceY = touchStartY - touchEndY;
    const isLeftSwipe = distanceX > threshold;
    const isRightSwipe = distanceX < -threshold;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe) {
      if (isLeftSwipe && onSwipeLeft) {
        onSwipeLeft();
      }
      if (isRightSwipe && onSwipeRight) {
        onSwipeRight();
      }
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
