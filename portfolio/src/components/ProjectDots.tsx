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
    <footer className="project-dots-div">
      <div className="project-dots">
        <span className="dot-home" onClick={() => onSelect(0)}>
          <FontAwesomeIcon icon={faHome} />
        </span>

        {projectPages.map((page, index) => (
          <span
            key={index}
            className={`dot ${currentProject === page ? "active" : ""} ${
              index === projectPages.length - 1 ? "last" : ""
            }`}
            onClick={() => onSelect(page)}
          />
        ))}

        <span
          className="dot-contact"
          onClick={() => onSelect(projectPages.length + 1)}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </span>
      </div>
    </footer>
  );
};
