import React, { useState } from "react";
import "./LazyImage.scss";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  isTechIcon?: boolean;
}

export const LazyImage: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  isTechIcon,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src) return null;

  return (
    <div
      className={`image-container ${isTechIcon ? "tech-icon" : ""} ${
        isLoaded ? "loaded" : ""
      } ${className || ""}`.trim()}
    >
      {!isLoaded && (
        <div className={`loading-spinner ${isTechIcon ? "tech-icon" : ""}`} />
      )}
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
