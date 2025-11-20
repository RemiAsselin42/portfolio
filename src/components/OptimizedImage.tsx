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
    if (!src) return;

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

  if (!src) return null;

  return (
    <div className={`optimized-image-container ${className}`}>
      {hasError ? (
        <div className="image-error flex items-center justify-center bg-gray-200 text-gray-500 text-sm p-4">
          Image non disponible
        </div>
      ) : (
        imageSrc && (
          <img
            src={imageSrc}
            srcSet={srcSet}
            alt={alt}
            className={`fade-in-image ${imageLoaded ? "loaded" : "loading"}`}
          />
        )
      )}
    </div>
  );
};
