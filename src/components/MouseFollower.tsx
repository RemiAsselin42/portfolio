import React, { useEffect, useRef } from "react";

interface MouseFollowerProps {
  isSafari?: boolean;
}

export const MouseFollower: React.FC<MouseFollowerProps> = ({
  isSafari = false,
}) => {
  const shapeRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const mouseRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;

      // Correction pour Safari où le conteneur est décalé de -100px
      if (isSafari) {
        x += 100;
        y += 100;
      }

      mouseRef.current = { x, y };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;

        if (isSafari) {
          x += 100;
          y += 100;
        }

        mouseRef.current = { x, y };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchstart", handleTouchMove);

    let animationFrameId: number;

    const animate = () => {
      // Facteur de lissage (plus petit = plus de délai/inertie)
      const ease = 0.08;

      posRef.current.x += (mouseRef.current.x - posRef.current.x) * ease;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * ease;

      if (shapeRef.current) {
        shapeRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSafari]);

  // Injection de l'animation pulse
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const wrapperStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 10000,
    willChange: "transform",
  };

  const innerStyle: React.CSSProperties = {
    width: "400px",
    height: "400px",
    backgroundColor: "#1a1717",
    borderRadius: "50%",
    animation: "pulse 5s ease-in-out infinite",
  };

  return (
    <div ref={shapeRef} style={wrapperStyle} className="mouse-follower-wrapper">
      <div style={innerStyle} className="mouse-follower-inner" />
    </div>
  );
};
