import React from "react";
import "./TikTokEmbed.scss";

interface TikTokEmbedProps {
  url: string;
  className?: string;
}

export const TikTokEmbed: React.FC<TikTokEmbedProps> = ({
  url,
  className = "",
}) => {
  return (
    <div className={`tiktok-embed-container ${className}`}>
      <iframe
        title="TikTok Video"
        src={`https://www.tiktok.com/embed/v2/${url}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
