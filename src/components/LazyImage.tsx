import React, { useState } from "react";
import "./LazyImage.scss";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src) return null;

  return (
    <div
      className={`lazy-image-container ${isLoaded ? "loaded" : ""} ${
        className || ""
      }`}
    >
      {!isLoaded && <div className="loading-spinner" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={isLoaded ? "visible" : ""}
        {...props}
      />
    </div>
  );
};
