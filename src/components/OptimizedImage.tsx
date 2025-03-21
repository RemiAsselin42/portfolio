import React, { useState, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    setImageLoaded(false);

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };

    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <div className={`optimized-image-container ${className}`}>
      {!imageLoaded && <div className="image-placeholder"></div>}
      <img
        src={imageSrc}
        alt={alt}
        className={`fade-in-image ${imageLoaded ? "loaded" : "loading"}`}
      />
    </div>
  );
};
