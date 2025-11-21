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
    let cachedRect: DOMRect | null = null;

    const updateRect = () => {
      if (textRef.current) {
        cachedRect = textRef.current.getBoundingClientRect();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
    };

    const animate = () => {
      if (isMouseMoving && textRef.current && cachedRect) {
        const centerX = cachedRect.left + cachedRect.width / 2;
        const centerY = cachedRect.top + cachedRect.height / 2;

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

        // Reset flag to avoid unnecessary updates if mouse stops but loop continues
        // However, for smooth tracking we might want to keep updating if we were interpolating,
        // but here we are setting position directly based on mouse, so we can stop if mouse doesn't move.
        isMouseMoving = false;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial rect calculation
    updateRect();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect); // In case the page scrolls

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
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
