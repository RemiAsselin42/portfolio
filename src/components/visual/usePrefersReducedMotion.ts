import { useEffect, useState } from 'react';

/**
 * Renvoie `true` si l'utilisateur a activé « réduire les animations ».
 * Sert à désactiver/figer les effets WebGL (accessibilité + économie GPU).
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
