// Language: tsx
import React, { useState, useEffect } from "react";
import "./ProjectModal.scss";

interface ProjectModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  onClose,
  children,
}) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
  };

  useEffect(() => {
    if (closing) {
      const timer = setTimeout(onClose, 300);
      return () => clearTimeout(timer);
    }
  }, [closing, onClose]);

  return (
    <div
      className={`modal-overlay ${closing ? "closing" : ""}`}
      onClick={handleClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 105.7 7.11L10.59 12l-4.89 4.89a1 1 0 101.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};
