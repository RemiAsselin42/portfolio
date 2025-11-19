import { useState, useEffect, useRef } from "react";
import React from "react";
import { PageProps } from "../types/PageTypes";
import { OptimizedImage } from "../components/OptimizedImage";

interface ProjectTemplateProps extends PageProps {
  projectId: number;
  projectInfo: string;
  projectImage?: {
    src: string;
    alt: string;
  };
  customMedia?: React.ReactNode;
  projectTitle: string;
  projectDescription: React.ReactNode;
  projectTech: string;
  nextButtonText?: string;
  knowMoreText?: string;
  modalContent: React.ReactNode | ModalContent;
  customModalFooter?: React.ReactNode;
}

// Keeping the old interface for backward compatibility
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
  customMedia,
  projectTitle,
  projectDescription,
  projectTech,
  nextButtonText = ">",
  knowMoreText = "+",
  onNextPage,
  modalContent,
}: ProjectTemplateProps) => {
  const [viewState, setViewState] = useState<"project" | "details">("project");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<
    "to-details" | "to-project"
  >("to-details");

  const [nextButtonHover, setNextButtonHover] = useState(false);
  const [moreButtonHover, setMoreButtonHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const projectLayoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScroll = () => {
    if (!projectLayoutRef.current || !isMobile) return;
    const { scrollTop, scrollHeight, clientHeight } = projectLayoutRef.current;
    setShowButtons(scrollTop + clientHeight >= scrollHeight - 50);
  };

  const handleSwitchView = (target: "project" | "details") => {
    if (isTransitioning) return;

    const direction = target === "details" ? "to-details" : "to-project";
    setTransitionDirection(direction);
    setIsTransitioning(true);

    if (target === "project") {
      setShowButtons(false);
    }

    setTimeout(() => {
      setViewState(target);
      setTimeout(() => {
        setIsTransitioning(false);
        if (target === "project" && projectLayoutRef.current) {
          projectLayoutRef.current.scrollTop = 0;
        }
      }, 500);
    }, 500);
  };

  const handleEnSavoirPlus = () => handleSwitchView("details");
  const handleBackToProject = () => handleSwitchView("project");

  const getAnimationClass = (forView: "project" | "details") => {
    if (!isTransitioning) return "";

    if (forView === "project") {
      return transitionDirection === "to-details"
        ? "flipping-out"
        : "flipping-in";
    } else {
      return transitionDirection === "to-details"
        ? "flipping-in"
        : "flipping-out";
    }
  };

  const renderModalContent = () => {
    if (
      React.isValidElement(modalContent) ||
      typeof modalContent === "string"
    ) {
      return (
        <div className="project-details-content custom-modal-content">
          {modalContent}
        </div>
      );
    }

    const oldFormatContent = modalContent as ModalContent;
    return (
      <div className="project-details-content">
        <h2 className="modale-title">{oldFormatContent.title}</h2>
        <p className="modale-description">{oldFormatContent.description}</p>

        {oldFormatContent.aboutProject && (
          <>
            <hr />
            <h2 className="modale-title">
              {oldFormatContent.aboutProjectTitle}
            </h2>
            <div className="modale-description">
              {oldFormatContent.aboutProject}
            </div>
          </>
        )}

        {oldFormatContent.portfolioTechnologies && (
          <section className="modale-section-logos">
            {oldFormatContent.portfolioTechnologies.map((tech, index) => (
              <div key={index} className="tech-icon-container">
                <img
                  src={`${tech.icon}`}
                  alt={tech.name}
                  className="modale-logo"
                />
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    );
  };

  return (
    <div className="project-flip-container">
      {viewState === "project" && (
        <div
          className={`project-container ${getAnimationClass("project")}`}
          id={`project-${projectId}`}
        >
          <h3 className="project-info">{projectInfo}</h3>
          <div
            className="project-layout"
            ref={projectLayoutRef}
            onScroll={handleScroll}
          >
            <div className="project-image" id={`project-${projectId}-image`}>
              {customMedia
                ? customMedia
                : projectImage && (
                    <OptimizedImage
                      src={`${projectImage.src}`}
                      alt={projectImage.alt}
                      className="project-image"
                    />
                  )}
            </div>
            <div className="project-text" id={`project-${projectId}-text`}>
              <h2 className="project-title">{projectTitle}</h2>
              <div className="project-description">{projectDescription}</div>
              <p className="project-tech">{projectTech}</p>
            </div>
          </div>

          <div
            className={`project-button-container ${
              showButtons ? "buttons-visible" : ""
            }`}
          >
            <div className="project-button">
              <button
                className="en-savoir-plus"
                onClick={handleEnSavoirPlus}
                onMouseEnter={() => !isMobile && setMoreButtonHover(true)}
                onMouseLeave={() => !isMobile && setMoreButtonHover(false)}
              >
                {!isMobile && (moreButtonHover ? " +" : knowMoreText)}
              </button>
              <button
                className="next-button"
                onClick={onNextPage}
                onMouseEnter={() => !isMobile && setNextButtonHover(true)}
                onMouseLeave={() => !isMobile && setNextButtonHover(false)}
              >
                {!isMobile && (nextButtonHover ? " >" : nextButtonText)}
              </button>
            </div>
          </div>
        </div>
      )}

      {viewState === "details" && (
        <>
          <div
            className={`project-details-container ${getAnimationClass(
              "details"
            )}`}
          >
            <div className="project-details">
              <div className="project-details-scrollable">
                {renderModalContent()}
              </div>
            </div>
          </div>

          {!isTransitioning && (
            <div className="back-to-project-fixed">
              <button className="prev-button" onClick={handleBackToProject}>
                Retour au projet
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
