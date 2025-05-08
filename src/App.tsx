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
  const [isSafari, setIsSafari] = useState(false);
  const [showSafariNotice, setShowSafariNotice] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isSafariBrowser =
      (ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1) ||
      ua.indexOf("iphone") !== -1 ||
      ua.indexOf("ipad") !== -1;

    setIsSafari(isSafariBrowser);
    if (isSafariBrowser) {
      setShowSafariNotice(true);
    }
  }, []);

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

  useEffect(() => {
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

    const handleResize = () => {
      const newShapesCount = calculateShapesCount();
      const newShapes = Array.from({ length: newShapesCount }, () =>
        generateRandomShape()
      );
      setShapesStyles(newShapes);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (currentPage < pages.length - 1) {
      const nextPageIndex = currentPage + 1;

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

    // Style de base pour tous les navigateurs
    const baseStyle = {
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

    return baseStyle;
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
    <>
      <div className="page-container">
        <div className={`bg ${isSafari ? "safari-bg" : ""}`}>
          <svg className="noise-filter">
            <defs>
              <filter
                id="blur"
                x="0"
                y="0"
                width="100%"
                height="100%"
                filterUnits="userSpaceOnUse"
              >
                <feGaussianBlur stdDeviation="80" result="blurredImage" />
                <feColorMatrix
                  type="saturate"
                  values="1"
                  in="blurredImage"
                  result="colorAdjusted"
                />
              </filter>
            </defs>
          </svg>

          <div
            className={`shapes-container ${isSafari ? "safari-shapes" : ""}`}
          >
            <div className="static-shape" />
            {shapesStyles.map((style, index) => (
              <div
                key={index}
                className={`shape ${isSafari ? "safari-shape" : ""}`}
                style={style}
              />
            ))}
          </div>
        </div>

        {/* Notification Safari */}
        {showSafariNotice && (
          <div className="safari-notice">
            <div className="safari-notice-content">
              <p>
                Pour une expérience visuelle optimale, je vous recommande plutôt
                d'utiliser Chrome ou Edge.
              </p>
              <button onClick={() => setShowSafariNotice(false)}>×</button>
            </div>
          </div>
        )}

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
