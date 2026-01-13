import React, { useRef, useState, useEffect } from "react";
import "./VideoPlayer.scss";
import { useVideoLazyLoad } from "../hooks/useVideoLazyLoad";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldLoad } = useVideoLazyLoad(containerRef);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [posterImage, setPosterImage] = useState<string | undefined>(undefined);
  const [videoInitialized, setVideoInitialized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const seekingRef = useRef(false);

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
      videoRef.current.muted = isMuted;
      playVideo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoInitialized]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const handleFsChange = () => {
      const current = document.fullscreenElement;
      setIsFullscreen(!!current && current === containerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

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

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    setProgress((current / duration) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current || !videoRef.current.duration) return;
    setProgress(0);
  };

  const handleToggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => console.error("Exit FS", err));
    } else {
      container
        .requestFullscreen()
        .catch((err) => console.error("Enter FS", err));
    }
  };

  const handleSeek = (clientX: number, target: HTMLDivElement) => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const rect = target.getBoundingClientRect();
    const clampedX = Math.min(Math.max(clientX, rect.left), rect.right);
    const ratio = (clampedX - rect.left) / rect.width;
    const newTime = ratio * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(ratio * 100);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    seekingRef.current = true;
    handleSeek(e.clientX, e.currentTarget);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!seekingRef.current) return;
    handleSeek(e.clientX, e.currentTarget);
  };

  const handlePointerUp = () => {
    seekingRef.current = false;
  };

  const showControls = isHovering || !isPlaying;

  return (
    <div
      ref={containerRef}
      className={`video-player-container ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
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
            <button className="play-button" aria-label="Lire la vidéo">
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
          muted={isMuted}
          onClick={togglePlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          preload="auto"
        />
      )}

      {videoInitialized && (
        <div className={`video-controls ${showControls ? "visible" : ""}`}>
          <button
            type="button"
            className="control-button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Lecture"}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="22"
                height="22"
              >
                <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="22"
                height="22"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <div className="progress-bar" aria-label="Progression de la vidéo">
            <div
              className="progress-track"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            className="control-button"
            onClick={handleToggleMute}
            aria-label={isMuted ? "Activer le son" : "Couper le son"}
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="22"
                height="22"
              >
                <path d="M16.5 12l3.5 3.5-1.5 1.5L15 13.5l-3.5 3.5-1.5-1.5L13.5 12 10 8.5l1.5-1.5L15 10.5l3.5-3.5 1.5 1.5z" />
                <path d="M5 9v6h4l5 5V4L9 9H5z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="22"
                height="22"
              >
                <path d="M5 9v6h4l5 5V4L9 9H5z" />
                <path d="M16.5 12c0-1.77-1-3.29-2.5-4.03v8.06c1.5-.74 2.5-2.26 2.5-4.03z" />
                <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4-.91 7-4.49 7-8.77s-3-7.86-7-8.77z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className="control-button"
            onClick={handleToggleFullscreen}
            aria-label={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
          >
            {isFullscreen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="22"
                height="22"
              >
                <path d="M9 9H5V5h4V3H3v6h6V9zm6 0h4V5h-4V3h6v6h-6V9zm4 6h-4v2h6v-6h-2v4zM9 15H5v-4H3v6h6v-2z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="22"
                height="22"
              >
                <path d="M9 3H3v6h2V5h4V3zm6 0v2h4v4h2V3h-6zm4 16h-4v2h6v-6h-2v4zM5 15H3v6h6v-2H5v-4z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
