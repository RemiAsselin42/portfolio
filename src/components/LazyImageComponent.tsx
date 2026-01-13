import React, { useState, useEffect } from "react";
import "./LazyImageComponent.scss";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  srcSet?: string;
  isTechIcon?: boolean;
  showError?: boolean;
}

export const LazyImageComponent: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  isTechIcon,
  srcSet,
  showError = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;

    setIsLoaded(false);
    setHasError(false);

    const imageElement = new window.Image();
    // Attach handlers BEFORE setting src to avoid race condition with cached images
    imageElement.onload = () => setIsLoaded(true);
    imageElement.onerror = () => setHasError(true);

    imageElement.src = src;
    if (srcSet) imageElement.srcset = srcSet;

    if (imageElement.complete) {
      setIsLoaded(true);
    }

    return () => {
      imageElement.onload = null;
      imageElement.onerror = null;
    };
  }, [src, srcSet]);

  if (!src) return null;

  const containerClasses = [
    "image-container",
    isTechIcon ? "tech-icon" : "",
    isLoaded ? "loaded" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  if (hasError && showError) {
    return (
      <div className={`${containerClasses} image-error`}>
        <div className="error-message">Image non disponible: {alt}</div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {!isLoaded && (
        <div className={`loading-spinner ${isTechIcon ? "tech-icon" : ""}`} />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={isLoaded ? "visible" : ""}
        srcSet={srcSet}
        {...props}
      />
    </div>
  );
};
