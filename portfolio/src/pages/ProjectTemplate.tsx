import { useState } from "react";
import React from "react";
import { PageProps } from "../types/PageTypes";

interface ProjectTemplateProps extends PageProps {
  projectId: number;
  projectInfo: string;
  projectImage: {
    src: string;
    alt: string;
  };
  projectTitle: string;
  projectDescription: React.ReactNode;
  projectTech: string;
  nextButtonText?: string;
  knowMoreText?: string;
  modalContent: ModalContent;
}

interface ModalContent {
  title: string;
  description: string;
  portfolioTechnologies?: {
    name: string;
    icon: string;
  }[];
  aboutProjectTitle?: string;
  aboutProject?: React.ReactNode;
}

export const ProjectTemplate = ({
  projectId,
  projectInfo,
  projectImage,
  projectTitle,
  projectDescription,
  projectTech,
  nextButtonText = "Suivant",
  knowMoreText = "En savoir plus",
  onNextPage,
  modalContent,
}: ProjectTemplateProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<
    "to-details" | "to-project"
  >("to-details");
  const [projectContainerVisible, setProjectContainerVisible] = useState(true);
  const [detailsContainerVisible, setDetailsContainerVisible] = useState(false);

  const handleEnSavoirPlus = () => {
    if (isFlipping) return;

    setFlipDirection("to-details");
    setIsFlipping(true);

    // Animation de sortie puis changement d'état
    setTimeout(() => {
      setProjectContainerVisible(false);
      setDetailsContainerVisible(true);
      setShowDetails(true);

      // Animation d'entrée de la nouvelle vue
      setTimeout(() => {
        setIsFlipping(false);
      }, 500);
    }, 500);
  };

  const handleBackToProject = () => {
    if (isFlipping) return;

    setFlipDirection("to-project");
    setIsFlipping(true);

    // Animation de sortie puis changement d'état
    setTimeout(() => {
      setDetailsContainerVisible(false);
      setProjectContainerVisible(true);
      setShowDetails(false);

      // Animation d'entrée de la nouvelle vue
      setTimeout(() => {
        setIsFlipping(false);
      }, 500);
    }, 500);
  };

  const renderModalContent = () => (
    <div className="project-details-content">
      <h2 className="modale-title">{modalContent.title}</h2>
      <p className="modale-description">{modalContent.description}</p>

      {modalContent.aboutProject && (
        <>
          <hr />
          <h2 className="modale-title">{modalContent.aboutProjectTitle}</h2>
          <div className="modale-description">{modalContent.aboutProject}</div>
        </>
      )}

      {modalContent.portfolioTechnologies && (
        <section className="modale-section-logos">
          {modalContent.portfolioTechnologies.map((tech, index) => (
            <div key={index} className="tech-icon-container">
              <img src={tech.icon} alt={tech.name} className="modale-logo" />
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </section>
      )}

      <section className="modale-section-rgpd">
        <p className="modale-description">
          Site réalisé par Rémi ASSELIN - {new Date().getFullYear()}
        </p>
      </section>

      <div className="back-to-project">
        <button className="next-button" onClick={handleBackToProject}>
          Retour au projet
        </button>
      </div>
    </div>
  );

  const getContainerClass = () => {
    if (!isFlipping) return "";

    if (flipDirection === "to-details") {
      return "flipping-out";
    } else {
      return "flipping-in";
    }
  };

  const getDetailsClass = () => {
    if (!isFlipping) return "";

    if (flipDirection === "to-details") {
      return "flipping-in";
    } else {
      return "flipping-out";
    }
  };

  return (
    <div className="project-flip-container">
      {projectContainerVisible && (
        <div
          className={`project-container ${getContainerClass()}`}
          id={`project-${projectId}`}
          style={{ display: showDetails && !isFlipping ? "none" : "block" }}
        >
          <h3 className="project-info">{projectInfo}</h3>
          <div className="project-layout">
            <div className="project-image" id={`project-${projectId}-image`}>
              <img
                src={projectImage.src}
                alt={projectImage.alt}
                className="project-image"
              />
            </div>
            <div className="project-text" id={`project-${projectId}-text`}>
              <h2 className="project-title">{projectTitle}</h2>
              <div className="project-description">{projectDescription}</div>
              <p className="project-tech">{projectTech}</p>
              <div className="project-button">
                <button className="en-savoir-plus" onClick={handleEnSavoirPlus}>
                  {knowMoreText}
                </button>
                <button className="next-button" onClick={onNextPage}>
                  {nextButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {detailsContainerVisible && (
        <div
          className={`project-details-container ${getDetailsClass()}`}
          style={{ display: !showDetails && !isFlipping ? "none" : "block" }}
        >
          {renderModalContent()}
        </div>
      )}
    </div>
  );
};
