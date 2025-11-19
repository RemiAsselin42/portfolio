import React, { useEffect, useMemo } from "react";

interface BackgroundShapeProps {
  isSafari: boolean;
}

export const BackgroundShape: React.FC<BackgroundShapeProps> = ({
  isSafari,
}) => {
  // Génération des paramètres aléatoires une seule fois au montage
  const params = useMemo(() => {
    const size = Math.floor(Math.random() * 300 + 500);
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
    const floatDirection = Math.random() > 0.5 ? 1 : -1;
    // Palette orangée / rose plus soutenu pour contraste texte blanc
    const warmColors = [
      "#FF6B6B", // Coral Red
      "#FF8E53", // Orange
      "#FF5252", // Red
      "#FF4081", // Pink
      "#F50057", // Deep Pink
      "#FF7043", // Deep Orange
    ];
    const color = warmColors[Math.floor(Math.random() * warmColors.length)];

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
      floatDirection,
      color,
      polygon,
      animationName,
    };
  }, []);

  // Gestion du cycle de vie des styles CSS (création et nettoyage)
  useEffect(() => {
    const keyframes = `
      @keyframes ${params.animationName} {
        0% {
          transform: translate(-50%, -50%) rotate(0deg) scale(1);
        }
        33% {
          transform: translate(${params.randomTranslateX}%, ${
      params.randomTranslateY
    }%) 
                    rotate(${params.randomRotate}deg) 
                    scale(${params.randomScale});
        }
        66% {
          transform: translate(${-params.randomTranslateX}%, ${-params.randomTranslateY}%) 
                    rotate(${-params.randomRotate}deg) 
                    scale(${2 - params.randomScale});
        }
        100% {
          transform: translate(-50%, -50%) rotate(0deg) scale(1);
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

  const style: React.CSSProperties = {
    position: "absolute",
    width: `${params.size}px`,
    height: `${params.size}px`,
    top: `${params.top}%`,
    left: `${params.left}%`,
    backgroundColor: params.color,
    clipPath: `polygon(${params.polygon})`,
    opacity: "0.8",
    transition: "all 0.3s ease",
    transform: "translate(-50%, -50%)",
    animation: `${params.animationName} ${params.animationDuration}s ease-in-out infinite`,
    animationDirection: params.floatDirection > 0 ? "normal" : "reverse",
  };

  return (
    <div className={`shape ${isSafari ? "safari-shape" : ""}`} style={style} />
  );
};
