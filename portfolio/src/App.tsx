import { useState, useEffect } from "react";
import "./styles/main.scss";
import "./pagesStyles/home.scss";
import "./pagesStyles/contact.scss";
import "./pagesStyles/project.scss";
import { pages } from "./pages";
import { ProjectDots } from "./components/ProjectDots";

function App() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [animationStage, setAnimationStage] = useState<
    | "fade-in"
    | "fade-out"
    | "reset-position"
    | "left-fade-out"
    | "left-reset-position"
    | "left-fade-in"
  >("fade-in");
  const [shapesStyles, setShapesStyles] = useState<React.CSSProperties[]>([]);

  const handlePageTransition = (newPage: number) => {
    if (newPage < currentPage) {
      // Transition de la gauche vers la droite pour revenir en arrière
      setAnimationStage("left-fade-out");
      setTimeout(() => {
        setAnimationStage("left-reset-position");
        setCurrentPage(newPage);
        setTimeout(() => {
          setAnimationStage("left-fade-in");
        }, 20);
      }, 1000);
    } else {
      // Transition droite vers gauche habituelle pour avancer
      setAnimationStage("fade-out");
      setTimeout(() => {
        setAnimationStage("reset-position");
        setCurrentPage(newPage);
        setTimeout(() => {
          setAnimationStage("fade-in");
        }, 20);
      }, 1000);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      handlePageTransition(currentPage + 1);
    }
  };

  const handleHomePage = () => {
    handlePageTransition(0);
  };

  const handleContactPage = () => {
    handlePageTransition(pages.length - 1);
  };

  useEffect(() => {
    const shapesCount = 5;
    const shapes = Array.from({ length: shapesCount }, () =>
      generateRandomShape()
    );
    setShapesStyles(shapes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateRandomShape = () => {
    const size = Math.floor(Math.random() * 300 + 500);
    const top = Math.random() * 100;
    const left = Math.random() * 100;

    const randomTranslateX = -50 + Math.random() * 10 - 5;
    const randomTranslateY = -50 + Math.random() * 10 - 5;
    const randomRotate = Math.random() * 10 - 5;
    const randomScale = 0.9 + Math.random() * 0.3;

    const customAnimation = `
      @keyframes float${size} {
        0% {
          transform: translate(-50%, -50%) rotate(0deg) scale(1);
        }
        33% {
          transform: translate(${randomTranslateX}%, ${randomTranslateY}%) 
                    rotate(${randomRotate}deg) 
                    scale(${randomScale});
        }
        66% {
          transform: translate(${-randomTranslateX}%, ${-randomTranslateY}%) 
                    rotate(${-randomRotate}deg) 
                    scale(${2 - randomScale});
        }
        100% {
          transform: translate(-50%, -50%) rotate(0deg) scale(1);
        }
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = customAnimation;
    document.head.appendChild(styleSheet);

    const warmColors = ["#ff6b6b", "#f0a500", "#ffcc00", "#ff9564", "#ff5733"];
    const color = warmColors[Math.floor(Math.random() * warmColors.length)];
    const animationDuration = 50 + Math.random() * 10;
    const floatDirection = Math.random() > 0.5 ? 1 : -1;

    return {
      position: "absolute",
      width: `${size}px`,
      height: `${size}px`,
      top: `${top}%`,
      left: `${left}%`,
      backgroundColor: color,
      clipPath: `polygon(${generateRandomPolygon()})`,
      opacity: "0.6",
      transition: "all 0.3s ease",
      transform: "translate(-50%, -50%)",
      animation: `float${size} ${animationDuration}s ease-in-out infinite`,
      animationDirection: floatDirection > 0 ? "normal" : "reverse",
    } as React.CSSProperties;
  };

  const generateRandomPolygon = () => {
    const points = Math.floor(Math.random() * 8) + 5;
    return Array.from({ length: points }, (_, i) => {
      const baseAngle = (i / points) * 2 * Math.PI;
      const angleVariation = (Math.random() - 0.5) * 0.5;
      const angle = baseAngle + angleVariation;
      const radius = 20 + Math.random() * 60;
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      return `${x}% ${y}%`;
    }).join(", ");
  };

  const CurrentPage = pages[currentPage];

  if (currentPage >= pages.length || currentPage < 0) {
    return <div className="error">Page not found</div>;
  }

  const isProjectPage = currentPage > 0 && currentPage < pages.length - 1;
  const projectPages = Array.from(
    { length: pages.length - 2 },
    (_, i) => i + 1
  );

  return (
    <div className="page-container">
      <div className="bg">
        <svg className="noise-filter">
          <defs>
            <filter id="noise" x="0" y="0" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix
                type="saturate"
                values="0"
                in="noise"
                result="grayscaleNoise"
              />
              <feComponentTransfer>
                <feFuncA type="linear" slope="2" />
              </feComponentTransfer>
            </filter>
            <filter id="blur">
              <feGaussianBlur stdDeviation="100" />
              <feColorMatrix type="saturate" values="1" />
            </filter>
          </defs>
        </svg>

        <div className="shapes-container">
          <div className="static-shape" />
          {shapesStyles.map((style, index) => (
            <div key={index} className="shape" style={style} />
          ))}
        </div>
        <svg className="noise-svg" width="100%" height="100%">
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
      <div
        className={`page-wrapper ${animationStage}`}
        id={`page-${currentPage}`}
      >
        <CurrentPage
          onNextPage={handleNextPage}
          onHomePage={handleHomePage}
          onContactPage={handleContactPage}
        />
      </div>
      {isProjectPage && (
        <ProjectDots
          projectPages={projectPages}
          currentProject={currentPage}
          onSelect={(page) => handlePageTransition(page)}
        />
      )}
    </div>
  );
}

export default App;
