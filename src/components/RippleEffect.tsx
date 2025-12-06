import React, { useRef, useEffect } from "react";
import "./RippleEffect.scss";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const RippleEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);
  const ripplesRef = useRef<Ripple[]>([]);
  const lastRippleTimeRef = useRef(0);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      const target = e.target as HTMLElement;

      // Classes bloquées (où le ripple ne doit PAS fonctionner)
      const blockedClasses = [
        "name-title-1",
        "home-button-div",
        "project-text",
        "fade-in-image",
        "loaded",
        "portfolio-modal-content",
        "project-details-container",
        "contact-section",
      ];

      // Vérifier si le clic est sur un élément bloqué ou un enfant d'élément bloqué
      for (const blockedClass of blockedClasses) {
        if (target.closest(`.${blockedClass}`)) {
          return;
        }
      }

      // Vérifier que ce n'est pas un élément interactif
      // (boutons, liens, inputs, etc.)
      const interactiveElements = target.closest(
        "button, a, input, textarea, select, [role='button']"
      ) as HTMLElement | null;

      if (interactiveElements) {
        return;
      }

      // Vérifier le délai entre les ripples (1000ms minimum)
      const now = Date.now();

      if (now - lastRippleTimeRef.current < 1000) {
        return;
      }
      lastRippleTimeRef.current = now;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rippleId = rippleIdRef.current++;
      const newRipple: Ripple = { id: rippleId, x, y };
      ripplesRef.current.push(newRipple);

      // Créer l'élément ripple
      const rippleElement = document.createElement("div");
      rippleElement.className = "ripple-wave";
      rippleElement.style.left = `${x}px`;
      rippleElement.style.top = `${y}px`;

      // Couleur aléatoire parmi la palette de tons clairs/pales rose/orangés
      const colors = ["#231f1fc5", "#231f1fb4", "#231f1f"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      rippleElement.style.setProperty("--ripple-color", randomColor);

      // Calculer la distance maximale basée sur la taille de l'écran
      const maxDimension = Math.max(window.innerWidth, window.innerHeight);
      const scale = maxDimension / 1920; // Référence 1920px
      const maxScale = Math.min(200 + scale * 50, 250);
      rippleElement.style.setProperty(
        "--ripple-max-scale",
        maxScale.toString()
      );

      // Dispatcher un événement personnalisé pour notifier les shapes
      window.dispatchEvent(
        new CustomEvent("ripple-created", {
          detail: { x, y, maxScale },
        })
      );

      containerRef.current.appendChild(rippleElement);

      // Supprimer l'élément après l'animation (1800ms + buffer)
      setTimeout(() => {
        if (rippleElement.parentNode) {
          rippleElement.parentNode.removeChild(rippleElement);
        }
        ripplesRef.current = ripplesRef.current.filter(
          (r) => r.id !== rippleId
        );
      }, 2200);
    };

    document.addEventListener("click", handleGlobalClick, true);

    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  return <div ref={containerRef} className="ripple-container" />;
};
