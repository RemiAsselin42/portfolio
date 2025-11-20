import React, { useEffect, useMemo, useRef, useState } from "react";

interface BackgroundShapeProps {
  isSafari: boolean;
}

export const BackgroundShape: React.FC<BackgroundShapeProps> = ({
  isSafari,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const currentOffset = useRef({ x: 0, y: 0 });

  // Génération des paramètres aléatoires une seule fois au montage
  const params = useMemo(() => {
    const width = window.innerWidth;
    let baseSizeMin, baseSizeMax;

    if (width >= 3440) {
      baseSizeMin = 600;
      baseSizeMax = 1000;
    } else if (width >= 1920) {
      baseSizeMin = 500;
      baseSizeMax = 800;
    } else if (width >= 992) {
      baseSizeMin = 400;
      baseSizeMax = 700;
    } else {
      baseSizeMin = 250;
      baseSizeMax = 500;
    }

    const size = Math.floor(
      Math.random() * (baseSizeMax - baseSizeMin) + baseSizeMin
    );
    // On garde les formes plus centrées (15-85%) pour éviter qu'elles sortent trop
    const top = Math.random() * 70 + 15;
    const left = Math.random() * 70 + 15;

    // Mouvements plus amples et aléatoires
    const moveAmplitude = 25;
    const randomTranslateX =
      -50 + (Math.random() * moveAmplitude * 2 - moveAmplitude);
    const randomTranslateY =
      -50 + (Math.random() * moveAmplitude * 2 - moveAmplitude);
    const randomRotate = Math.random() * 60 - 30; // +/- 30deg
    const randomScale = 0.8 + Math.random() * 0.6; // 0.8 à 1.4

    const animationDuration = 45 + Math.random() * 20; // Durée plus variable
    const animationDelay = Math.random() * -20; // Délai négatif pour commencer à différents moments
    const floatDirection = Math.random() > 0.5 ? 1 : -1;
    // Palette orangée / rose plus soutenu pour contraste texte blanc
    const warmColors = [
      "#FF6B6B", // Coral Red
      "#ff5378ff", // Orange
      "#FF5252", // Red
      "#FF4081", // Pink
      "#F50057", // Deep Pink
      "#ff438bff", // Deep Orange
    ];
    const initialColor =
      warmColors[Math.floor(Math.random() * warmColors.length)];

    // Génération du polygone
    const points = Math.floor(Math.random() * 8) + 5;
    const polygon = Array.from({ length: points }, (_, i) => {
      const baseAngle = (i / points) * 2 * Math.PI;
      const angleVariation = (Math.random() - 0.5) * 0.5;
      const angle = baseAngle + angleVariation;
      const radius = 20 + Math.random() * 60;
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      return `${x}% ${y}%`;
    }).join(", ");

    // ID unique pour l'animation
    const animationName = `float-${Math.random().toString(36).substr(2, 9)}`;

    return {
      size,
      top,
      left,
      randomTranslateX,
      randomTranslateY,
      randomRotate,
      randomScale,
      animationDuration,
      animationDelay,
      floatDirection,
      initialColor,
      warmColors,
      polygon,
      animationName,
    };
  }, []);

  const [currentColor, setCurrentColor] = useState(params.initialColor);

  // Changement de couleur aléatoire
  useEffect(() => {
    const interval = setInterval(() => {
      // 30% de chance de changer de couleur à chaque intervalle
      if (Math.random() < 0.3) {
        const newColor =
          params.warmColors[
            Math.floor(Math.random() * params.warmColors.length)
          ];
        setCurrentColor(newColor);
      }
    }, 4000); // Vérifie toutes les 4 secondes

    return () => clearInterval(interval);
  }, [params.warmColors]);

  // Gestion du cycle de vie des styles CSS (création et nettoyage)
  useEffect(() => {
    const keyframes = `
      @keyframes ${params.animationName} {
        0% {
          transform: translate(-50%, -50%) rotate(0deg) scale(0.8);
          opacity: 0.3;
        }
        25% {
          transform: translate(${params.randomTranslateX * 0.5}%, ${
      params.randomTranslateY * 0.5
    }%) 
                    rotate(${params.randomRotate * 0.5}deg) 
                    scale(${params.randomScale});
          opacity: 0.7;
        }
        50% {
          transform: translate(${params.randomTranslateX}%, ${
      params.randomTranslateY
    }%) 
                    rotate(${params.randomRotate}deg) 
                    scale(${params.randomScale * 1.4});
          opacity: 0.2;
        }
        75% {
          transform: translate(${params.randomTranslateX * 0.5}%, ${
      params.randomTranslateY * 0.5
    }%) 
                    rotate(${params.randomRotate * 0.5}deg) 
                    scale(${params.randomScale});
          opacity: 0.6;
        }
        100% {
          transform: translate(-50%, -50%) rotate(0deg) scale(0.8);
          opacity: 0.3;
        }
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);

    // Nettoyage lors du démontage du composant
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [params]);

  // Logique de fuite de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      if (!wrapperRef.current) return;

      // Calcul de la position d'ancrage en pixels
      const anchorX = (window.innerWidth * params.left) / 100;
      const anchorY = (window.innerHeight * params.top) / 100;

      const dx = anchorX - mouseRef.current.x;
      const dy = anchorY - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const maxDist = 400; // Rayon d'interaction
      const maxDisplacement = 100; // Déplacement maximum en pixels

      let targetX = 0;
      let targetY = 0;

      if (dist < maxDist) {
        const force = (maxDist - dist) / maxDist;
        // Fuite : on s'éloigne de la souris
        targetX = (dx / dist) * force * maxDisplacement;
        targetY = (dy / dist) * force * maxDisplacement;
      }

      // Lissage du mouvement (Lerp)
      const ease = 0.05;
      currentOffset.current.x += (targetX - currentOffset.current.x) * ease;
      currentOffset.current.y += (targetY - currentOffset.current.y) * ease;

      // Application de la transformation sur le wrapper
      wrapperRef.current.style.transform = `translate(${currentOffset.current.x}px, ${currentOffset.current.y}px)`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [params.left, params.top]);

  const wrapperStyle: React.CSSProperties = {
    position: "absolute",
    top: `${params.top}%`,
    left: `${params.left}%`,
    pointerEvents: "none",
    zIndex: 0,
  };

  const shapeStyle: React.CSSProperties = {
    width: `${params.size}px`,
    height: `${params.size}px`,
    backgroundColor: currentColor,
    clipPath: `polygon(${params.polygon})`,
    // Opacité gérée par l'animation
    transition: "background-color 3s ease",
    // L'animation gère le centrage (-50%, -50%) et le flottement
    animation: `${params.animationName} ${params.animationDuration}s ease-in-out infinite`,
    animationDelay: `${params.animationDelay}s`,
    animationDirection: params.floatDirection > 0 ? "normal" : "reverse",
  };

  return (
    <div ref={wrapperRef} style={wrapperStyle}>
      <div
        className={`shape ${isSafari ? "safari-shape" : ""}`}
        style={shapeStyle}
      />
    </div>
  );
};
