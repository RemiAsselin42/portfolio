import { PageProps } from "../types/PageTypes";
import { RollingText } from "../components/RollingText";
import { useEffect, useRef } from "react";

export const HomePage = ({ onNextPage, onContactPage }: PageProps) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
    };

    const animate = () => {
      if (isMouseMoving && textRef.current) {
        // Always get fresh rect to handle page transitions and scrolling correctly
        const rect = textRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;

        // Rotation -5deg in CSS means we need to rotate +5deg to align with local axes
        const angle = 5 * (Math.PI / 180);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const rotatedX = dx * cos - dy * sin;
        const rotatedY = dx * sin + dy * cos;

        const finalX = rotatedX + textRef.current.offsetWidth / 2;
        const finalY = rotatedY + textRef.current.offsetHeight / 2;

        textRef.current.style.setProperty("--cursor-x", `${finalX}px`);
        textRef.current.style.setProperty("--cursor-y", `${finalY}px`);

        isMouseMoving = false;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div id="home-container">
      <h1 className="name-title-1">
        Rémi
        <span className="name-background" ref={textRef}>
          Asselin
        </span>
      </h1>
      <div className="home-button-div">
        <button className="home-button" onClick={onNextPage}>
          <RollingText text="Portfolio" />
        </button>
        <button className="home-button contact-button" onClick={onContactPage}>
          <RollingText text="Contact" />
        </button>
      </div>
    </div>
  );
};

HomePage.pageId = 0;
