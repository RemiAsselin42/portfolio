// src/pages/Project1Page.tsx
import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";

export const Project1Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={1}
    projectInfo="Présentation"
    projectImage={{
      src: "/remi-pixel-art.png",
      alt: "Portrait pixel art de Rémi",
    }}
    projectTitle="Bonjour !"
    projectDescription={
      <>
        <strong>Bienvenue</strong> sur mon portfolio ! Je m'appelle{" "}
        <strong>Rémi</strong> et je suis <strong>designer web</strong> et{" "}
        <strong>développeur web</strong>. J'adore imaginer, concevoir et coder
        des sites web et des applications. Je suis actuellement en{" "}
        <strong>bachelor Information Communication et Design Digital</strong> à{" "}
        <strong>Télécom Saint-Etienne</strong> et je suis à la recherche d'un{" "}
        <strong>master en web design</strong> pour septembre 2025.
        <br />
        Dans ce portfolio, vous trouverez plusieurs de mes{" "}
        <strong>créations digitales</strong>, qu'il s'agisse de{" "}
        <strong>projets personnels</strong> ou de{" "}
        <strong>projets scolaires</strong>, dans le web, le print ou encore en
        audiovisuel.
        <br />
        En parallèle de ma formation, j'ai créé mon{" "}
        <strong>auto-entreprise</strong> dans le domaine du web, ce qui m'a
        permis de travailler sur divers projets pour des{" "}
        <strong>associations dans le social</strong>, et d'acquérir des
        compétences en
        <strong> gestion entrepreneuriale</strong>.
        <br />
        Au travers de mon cursus et de mon activité, j'ai renforcé mes
        compétences en <strong>design et développement web</strong> en utilisant
        des outils et technologies variés : la Suite Adobe (Photoshop,
        Illustrator, InDesign, Adobe XD), Figma, HTML, SCSS, JS, React, PHP,
        SQL, Python, ainsi que GitHub. J'ai également acquis une expérience en
        création et montage vidéo (Premiere Pro), ainsi qu'en photographie.
      </>
    }
    projectTech=""
    nextButtonText="Découvrir mes projets"
    modalContent={{
      title: "Détails du projet",
      description:
        "Tout au long de ce portfolio vous pourrez cliquer sur les images de présentation des différents projets pour en savoir plus, et même tester certaines applications !",
      aboutProjectTitle: "À propos de ce site",
      aboutProject:
        "J'ai réalisé ce site web entièrement par moi-même, en utilisant React (vite.js), le TypeScript, le SCSS, et le tout hébergé sur GitHub.",
      portfolioTechnologies: [
        { name: "React", icon: "/react.png" },
        { name: "Vite", icon: "/vite.png" },
        { name: "TypeScript", icon: "/typescript.png" },
        { name: "SCSS", icon: "/sass.png" },
        { name: "CSS", icon: "/css.png" },
        { name: "GitHub", icon: "/github.png" },
      ],
    }}
  />
);

Project1Page.pageId = 1;
