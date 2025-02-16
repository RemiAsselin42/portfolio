import React from "react";
import "./ProjectDots.scss";

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
    <div className="project-dots-div">
      <div className="project-dots">
        {projectPages.map((page, index) => (
          <span
            key={index}
            className={`dot ${currentProject === page ? "active" : ""} ${
              index === projectPages.length - 1 ? "last" : ""
            }`}
            onClick={() => onSelect(page)}
          />
        ))}
      </div>
    </div>
  );
};
