import React, { useState, useEffect } from "react";
import "./LazyImage.scss";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  srcSet?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  srcSet,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    setImageLoaded(false);
    setHasError(false);

    const img = new Image();
    img.src = src;
    if (srcSet) img.srcset = srcSet;

    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };

    img.onerror = () => {
      setHasError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, srcSet]);

  return (
    <div className={`optimized-image-container ${className}`}>
      {!imageLoaded && !hasError && (
        <div
          className="loading-spinner"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      {hasError ? (
        <div className="image-error flex items-center justify-center bg-gray-200 text-gray-500 text-sm p-4">
          Image non disponible
        </div>
      ) : (
        <img
          src={imageSrc}
          srcSet={srcSet}
          alt={alt}
          className={`fade-in-image ${imageLoaded ? "loaded" : "loading"}`}
        />
      )}
    </div>
  );
};
