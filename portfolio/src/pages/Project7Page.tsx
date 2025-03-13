import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";

export const Project7Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={7}
    projectInfo="Projet de cours : Workshop avec le département de la Loire"
    projectImage={{
      src: "/mockup-hirogo.png",
      alt: "Mockup La Grimpette",
    }}
    projectTitle="La Grimpette"
    projectDescription={
      <>
        <strong>La Grimpette</strong> est un projet de cours autour du PHP et du
        SQL. Il s'agit du site d'un club d'escalade fictif. Ce projet comprend
        deux volets essentiels :
        <br />• <strong>Un site front</strong> qui présente le club, ses
        activités et événements avec la posibilité de s'y inscrire.
        <br />• <strong>Un site backoffice</strong> dédié à la gestion des
        inscriptions et des activités. On peut par exemple y ajouter des
        activités, les modifier, les supprimer, valdier les inscriptions, les
        refuser, et voir les activités et inscriptions passées.
        <br />
        Le design du site a été fait au préalable sur Figma.
      </>
    }
    projectTech="Figma, HTML, CSS, SCSS, JavaScript, React (Vite), JSON, PHP, SQL, WAMP, GitHub"
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

Project7Page.pageId = 7;
