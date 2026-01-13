import { useState, useEffect, useMemo } from "react";
import "./styles/pageStyles";
import { pages } from "./pages";
import { ProjectDots } from "./components/ProjectDots";
import { BackgroundShape } from "./components/BackgroundShape";
import { MouseFollower } from "./components/MouseFollower";
import { RippleEffect } from "./components/RippleEffect";
import {
  useImagePreloader,
  useSwipe,
  usePageTransition,
  useBackgroundShapes,
} from "./hooks";

function App() {
  const {
    currentPage,
    animationStage,
    transitionToPage,
    goToNextPage,
    goToPreviousPage,
    goToHomePage,
    goToContactPage,
  } = usePageTransition({
    totalPages: pages.length,
  });

  const shapesCount = useBackgroundShapes();
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isSafariBrowser =
      (ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1) ||
      ua.indexOf("iphone") !== -1 ||
      ua.indexOf("ipad") !== -1;

    setIsSafari(isSafariBrowser);
  }, []);

  const swipeHandlers = useSwipe({
    onSwipeLeft: goToNextPage,
    onSwipeRight: goToPreviousPage,
  });

  // Navigation clavier avec flèches
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorer si l'utilisateur est dans un champ de formulaire
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPreviousPage();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToHomePage();
      } else if (e.key === "End") {
        e.preventDefault();
        goToContactPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextPage, goToPreviousPage, goToHomePage, goToContactPage]);

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
      "/hirogo-presentation.webp",
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
      {/* Skip link pour navigation clavier */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      {/* Page transition announcement for screen readers */}
      <div
        id="page-transition-announcement"
        role="status"
        aria-live="polite"
        className="sr-only"
        aria-atomic="true"
      />

      <div
        className="page-container"
        {...swipeHandlers}
        role="application"
        aria-label="Portfolio interactif"
      >
        <div className={`bg ${isSafari ? "safari-bg" : ""}`} aria-hidden="true">
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

        <main
          className={`page-wrapper ${animationStage} ${
            isProjectPage ? "project-page-wrapper" : ""
          } ${currentPage === 0 ? "home-page" : `project-${currentPage}`} ${
            currentPage === pages.length - 1 ? "contact-page" : ""
          }`}
          id="main-content"
          aria-label={`Page ${currentPage + 1} sur ${pages.length}`}
        >
          <CurrentPage
            onNextPage={goToNextPage}
            onHomePage={goToHomePage}
            onContactPage={goToContactPage}
          />
        </main>

        {isProjectPage && (
          <nav aria-label="Navigation entre projets">
            <ProjectDots
              projectPages={projectPages}
              currentProject={currentPage}
              onSelect={transitionToPage}
            />
          </nav>
        )}
      </div>
    </>
  );
}

export default App;
