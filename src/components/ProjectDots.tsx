import React from "react";
import "./ProjectDots.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
            <FontAwesomeIcon icon={faHome} />
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
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </li>
      </ul>
    </nav>
  );
};
