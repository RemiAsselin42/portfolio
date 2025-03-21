import { useState, useEffect } from "react";
import "./styles/main.scss";
import "./pagesStyles/home.scss";
import "./pagesStyles/contact.scss";
import "./pagesStyles/project.scss";
import { pages } from "./pages";
import { ProjectDots } from "./components/ProjectDots";
import { MobileWarning } from "./components/MobileWarning";

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
  const [bypassMobileWarning, setBypassMobileWarning] =
    useState<boolean>(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  const checkMobileAndOrientation = () => {
    const mobileBreakpoint = 768;
    const isMobile = window.innerWidth < mobileBreakpoint;
    const isPort = window.innerHeight > window.innerWidth;

    setIsMobileDevice(isMobile);
    setIsPortrait(isPort);
  };

  const handlePageTransition = (newPage: number) => {
    if (newPage < currentPage) {
      setAnimationStage("left-fade-out");
      setTimeout(() => {
        setAnimationStage("left-reset-position");
        setCurrentPage(newPage);
        setTimeout(() => {
          setAnimationStage("left-fade-in");
        }, 20);
      }, 1000);
    } else {
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

  const handleKnowMore = () => {
    const projectContainer = document.querySelector(".project-container");
    if (projectContainer) {
      projectContainer.setAttribute("style", "display: none;");
    }
  };

  const handleHomePage = () => {
    handlePageTransition(0);
  };

  const handleContactPage = () => {
    handlePageTransition(pages.length - 1);
  };

  const handleContinueAnyway = () => {
    setBypassMobileWarning(true);
    localStorage.setItem("bypassMobileWarning", "true");
  };

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà choisi de contourner l'avertissement mobile
    const savedBypass = localStorage.getItem("bypassMobileWarning");
    if (savedBypass === "true") {
      setBypassMobileWarning(true);
    }

    // Vérifier initialement si l'appareil est mobile
    checkMobileAndOrientation();

    const calculateShapesCount = () => {
      const width = window.innerWidth;
      if (width >= 3440) {
        return 10;
      } else if (width >= 1920) {
        return Math.round(3 + (width - 1920) * (7 / (3440 - 1920)));
      } else {
        return Math.max(3, Math.round(3 * (width / 1920)));
      }
    };

    const shapesCount = calculateShapesCount();
    const shapes = Array.from({ length: shapesCount }, () =>
      generateRandomShape()
    );
    setShapesStyles(shapes);

    // Utiliser matchMedia à la place de l'orientation dépréciée
    const handleOrientationChange = () => {
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      if (isLandscape) {
        setBypassMobileWarning(true);
      }
      // Mettre à jour l'état du mode portrait
      checkMobileAndOrientation();
    };

    // Gestionnaire d'événement pour le redimensionnement de la fenêtre
    const handleResize = () => {
      checkMobileAndOrientation();
    };

    const landscapeMedia = window.matchMedia("(orientation: landscape)");
    landscapeMedia.addEventListener("change", handleOrientationChange);
    window.addEventListener("resize", handleResize);

    return () => {
      landscapeMedia.removeEventListener("change", handleOrientationChange);
      window.addEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Précharger toutes les images de projet
    const imagesToPreload = [
      "/remi-pixel-art.png",
      "/mockup-hirogo.png",
      "/la-grimpette.png",
      "/yan-archi.png",
      "/geopostcodes.png",
      "/hyxe.png",
      "/bbv-olsberg.png",
      "/react.png",
      "/vite.png",
      "/typescript.png",
      "/sass.png",
      "/css.png",
      "/github.png",
      "/hopecore-poster.png",
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Ne pas précharger les vidéos ici, elles seront chargées au clic
  }, []);

  // Préchargement de l'image de la page suivante - correction de l'approche
  useEffect(() => {
    if (currentPage < pages.length - 1) {
      // Au lieu d'accéder directement à projectImage qui n'existe pas
      // Préchargez les images en fonction du numéro de page suivante
      const nextPageIndex = currentPage + 1;

      // Tableau d'images associées aux numéros de page
      const pageImageMap: Record<number, string[]> = {
        1: ["/remi-pixel-art.png"],
        2: ["/mockup-hirogo.png"],
        3: ["/la-grimpette.png"],
        4: ["/yan-archi.png"],
        5: ["/geopostcodes.png"],
        6: ["/hyxe.png"],
        7: ["/hopecode-tiktok.mp4"],
        8: ["/bbv-olsberg.png"],
      };

      if (pageImageMap[nextPageIndex]) {
        pageImageMap[nextPageIndex].forEach((imageSrc) => {
          const img = new Image();
          img.src = imageSrc;
        });
      }
    }
  }, [currentPage]);

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

  const shouldDisplayMobileWarning =
    isMobileDevice && isPortrait && !bypassMobileWarning;

  return (
    <>
      {shouldDisplayMobileWarning && (
        <MobileWarning onContinueAnyway={handleContinueAnyway} />
      )}

      <div
        className={`page-container ${
          shouldDisplayMobileWarning ? "hidden-on-mobile" : ""
        } ${bypassMobileWarning ? "force-display" : ""}`}
      >
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
            enSavoirPlus={handleKnowMore}
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
    </>
  );
}

export default App;
