import { useState, useEffect, useMemo } from "react";
import "./styles/main.scss";
import "./pagesStyles/home.scss";
import "./pagesStyles/contact.scss";
import "./pagesStyles/project.scss";
import { pages } from "./pages";
import { ProjectDots } from "./components/ProjectDots";
import { BackgroundShape } from "./components/BackgroundShape";
import { MouseFollower } from "./components/MouseFollower";
import { RippleEffect } from "./components/RippleEffect";
import { useImagePreloader } from "./hooks/useImagePreloader";
import { useSwipe } from "./hooks/useSwipe";

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
  const [shapesCount, setShapesCount] = useState<number>(0);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isSafariBrowser =
      (ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1) ||
      ua.indexOf("iphone") !== -1 ||
      ua.indexOf("ipad") !== -1;

    setIsSafari(isSafariBrowser);
  }, []);

  const handlePageTransition = (newPage: number) => {
    const isMobile = window.innerWidth < 992;
    const transitionDuration = isMobile ? 300 : 500;

    if (newPage < currentPage) {
      setAnimationStage("left-fade-out");
      setTimeout(() => {
        setAnimationStage("left-reset-position");
        setCurrentPage(newPage);
        setTimeout(() => {
          setAnimationStage("left-fade-in");
        }, 20);
      }, transitionDuration);
    } else {
      setAnimationStage("fade-out");
      setTimeout(() => {
        setAnimationStage("reset-position");
        setCurrentPage(newPage);
        setTimeout(() => {
          setAnimationStage("fade-in");
        }, 20);
      }, transitionDuration);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      handlePageTransition(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      handlePageTransition(currentPage - 1);
    }
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: handleNextPage,
    onSwipeRight: handlePrevPage,
  });

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
        return 12;
      } else if (width >= 1920) {
        return Math.round(5 + (width - 1920) * (7 / (3440 - 1920)));
      } else if (width >= 992) {
        return Math.round(2 + (width - 992) * (5 / (1920 - 992)));
      } else {
        return Math.max(0, Math.round(2 + (width / 992) * 3));
      }
    };

    setShapesCount(calculateShapesCount());

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShapesCount(calculateShapesCount());
      }, 300);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const initialImages = useMemo(
    () => [
      "/remi-pixel-art.webp",
      "/mockup-hirogo.webp",
      "/la-grimpette.webp",
      "/yan-archi.webp",
      "/geopostcodes.webp",
      "/hyxe.webp",
      "/bbv-olsberg.webp",
      "/react.webp",
      "/vite.webp",
      "/typescript.webp",
      "/javascript.webp",
      "/sass.webp",
      "/css.webp",
      "/html.webp",
      "/github.webp",
      "/hopecore-poster.webp",
      "/wamp.webp",
      "/sql.webp",
      "/mysql.webp",
      "/php.webp",
      "/hubspot.webp",
      "/indesign.webp",
      "/illustrator.webp",
      "/photoshop.webp",
      "/premiere.webp",
      "/aftereffects.webp",
      "/audition.webp",
      "/canon.webp",
      "/elementor.webp",
      "/hirogo-presentation.jpg",
      "/wordpress.webp",
      "/pappers.webp",
      "/linkedin.webp",
      "/openweather.webp",
      "/openstreetmap.webp",
      "/mapbox.webp",
      "/json.webp",
      "/figma.webp",
    ],
    []
  );

  useImagePreloader(initialImages);

  const nextImages = useMemo(() => {
    if (currentPage < pages.length - 1) {
      const nextPageIndex = currentPage + 1;

      const pageImageMap: Record<number, string[]> = {
        1: ["/remi-pixel-art.webp"],
        2: ["/mockup-hirogo.webp"],
        3: ["/la-grimpette.webp"],
        4: ["/yan-archi.webp"],
        5: ["/geopostcodes.webp"],
        6: ["/hyxe.webp"],
        7: ["/hopecore-poster.webp"],
      };

      return pageImageMap[nextPageIndex] || [];
    }
    return [];
  }, [currentPage]);

  useImagePreloader(nextImages);

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
      <div className="page-container" {...swipeHandlers}>
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
              </filter>
            </defs>
          </svg>

          <div
            className={`shapes-container ${isSafari ? "safari-shapes" : ""}`}
          >
            <div className="static-shape" />
            {Array.from({ length: shapesCount }).map((_, index) => (
              <BackgroundShape key={index} isSafari={isSafari} />
            ))}
            <MouseFollower isSafari={isSafari} />
          </div>
          <RippleEffect />
        </div>

        <div
          className={`page-wrapper ${animationStage} ${
            isProjectPage ? "project-page-wrapper" : ""
          } ${currentPage === 0 ? "home-page" : `project-${currentPage}`} ${
            currentPage === pages.length - 1 ? "contact-page" : ""
          }`}
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
    </>
  );
}

export default App;
