import React, { useRef, useState, useEffect } from "react";
import "./VideoPlayer.css";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [posterImage, setPosterImage] = useState<string | undefined>(undefined);
  const [videoInitialized, setVideoInitialized] = useState(false);

  // Préchargement de l'image poster
  useEffect(() => {
    if (poster) {
      const img = new Image();
      img.src = poster;
      img.onload = () => {
        setPosterImage(poster);
        setPosterLoaded(true);
      };
      return () => {
        img.onload = null;
      };
    } else {
      setPosterLoaded(true);
    }
  }, [poster]);

  // Démarrage automatique de la vidéo une fois initialisée
  useEffect(() => {
    if (videoInitialized && videoRef.current) {
      videoRef.current.load();
      playVideo();
    }
  }, [videoInitialized]);

  const handleFirstClick = () => {
    setVideoInitialized(true);
  };

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Erreur de lecture:", err);
          setIsPlaying(false);
        });
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      playVideo();
    }
  };

  return (
    <div className={`video-player-container ${className}`}>
      {!posterLoaded && (
        <div className="video-placeholder">
          <div className="video-loading-spinner"></div>
        </div>
      )}

      {posterLoaded && !videoInitialized && (
        <div className="video-poster" onClick={handleFirstClick}>
          <img
            src={posterImage}
            alt="Miniature vidéo"
            className="poster-image"
          />
          <div className="play-button-overlay">
            <button className="play-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="48"
                height="48"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {videoInitialized && (
        <video
          ref={videoRef}
          className="video-player"
          src={`/${src}`}
          poster={posterImage}
          loop
          playsInline
          onClick={togglePlay}
          preload="auto"
        />
      )}
    </div>
  );
};
