import React from "react";
import "./ProjectDots.scss";
import { HomeIcon, PaperPlaneIcon } from "./icons";

interface ProjectDotsProps {
  projectPages: number[];
  currentProject: number;
  onSelect: (page: number) => void;
}

export const ProjectDots: React.FC<ProjectDotsProps> = ({
  projectPages,
  currentProject,
  onSelect,
}) => {
  return (
    <nav className="project-dots-container">
      <ul className="project-dots-list">
        <li className="dot-item">
          <button
            className="dot-button home-icon"
            onClick={() => onSelect(0)}
            aria-label="Accueil"
          >
            <HomeIcon size={18} />
          </button>
        </li>

        {projectPages.map((page, index) => (
          <li key={index} className="dot-item">
            <button
              className={`dot-button circle ${
                currentProject === page ? "active" : ""
              }`}
              onClick={() => onSelect(page)}
              aria-label={`Projet ${page}`}
            />
          </li>
        ))}

        <li className="dot-item">
          <button
            className="dot-button contact-icon"
            onClick={() => onSelect(projectPages.length + 1)}
            aria-label="Contact"
          >
            <PaperPlaneIcon size={18} />
          </button>
        </li>
      </ul>
    </nav>
  );
};
