import { useState } from "react";
import React from "react";
import { PageProps } from "../types/PageTypes";
import { ProjectModal } from "../components/ProjectModal";

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
  onNextPage,
  modalContent,
}: ProjectTemplateProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="project-container" id={`project-${projectId}`}>
      <h3 className="project-info">{projectInfo}</h3>
      <div className="project-layout">
        <div
          className="project-image"
          id={`project-${projectId}-image`}
          onClick={() => setOpenModal(true)}
        >
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
            <button className="next-button" onClick={onNextPage}>
              {nextButtonText}
            </button>
          </div>
        </div>
      </div>

      {openModal && (
        <ProjectModal onClose={() => setOpenModal(false)}>
          <h2 className="modale-title">{modalContent.title}</h2>
          <p className="modale-description">{modalContent.description}</p>

          {modalContent.aboutProject && (
            <>
              <hr />
              <h2 className="modale-title">{modalContent.aboutProjectTitle}</h2>
              <div className="modale-description">
                {modalContent.aboutProject}
              </div>
            </>
          )}

          {modalContent.portfolioTechnologies && (
            <section className="modale-section-logos">
              {modalContent.portfolioTechnologies.map((tech, index) => (
                <img
                  key={index}
                  src={tech.icon}
                  alt={tech.name}
                  className="modale-logo"
                />
              ))}
            </section>
          )}

          <section className="modale-section-rgpd">
            <p className="modale-description">
              Site réalisé par Rémi ASSELIN - {new Date().getFullYear()}
            </p>
          </section>
        </ProjectModal>
      )}
    </div>
  );
};
