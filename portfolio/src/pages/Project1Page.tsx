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
        <strong>Bienvenue</strong> sur mon portfolio !
        <hr />
        Je suis Rémi, <strong>designer et développeur web</strong> à mon compte
        !
        <hr />
        Actuellement en{" "}
        <strong>
          bachelor Information Communication et Design Digital
        </strong> à <strong>Télécom Saint-Étienne</strong>, je recherche un{" "}
        <strong>master en web design</strong> pour septembre 2025.
        <hr />
        Découvrez ici mes <strong>projets web, print et audiovisuels</strong>,
        issus de travaux personnels et académiques.
        <hr />
        En parallèle, j’ai créé mon <strong>auto-entreprise</strong>,
        collaborant avec des <strong>associations du secteur social</strong>,
        développant ainsi mes compétences en{" "}
        <strong>gestion entrepreneuriale</strong>
        .
        <hr />
        Je maîtrise divers outils et technologies :{" "}
        <strong>
          Suite Adobe, Figma, HTML, SCSS, JS, React, PHP, SQL, Python, GitHub.
        </strong>
        <hr />
        J’ai également une expérience en <strong>vidéo et photographie</strong>.
        <hr />
        Curieux d’en savoir plus ? Cliquez sur suivant ou{" "}
        <button className="btn-contact-text" onClick={props.onContactPage}>
          <strong>contactez-moi </strong>
        </button>{" "}
        directement !
      </>
    }
    projectTech=""
    nextButtonText="Suivant"
    modalContent={{
      title: "Détails du projet",
      description:
        "Tout au long de ce portfolio vous pourrez accéder à descriptifs détaillés de mes différents projets pour en savoir plus, et même tester certaines applications !",
      aboutProjectTitle: "À propos de ce site",
      aboutProject:
        "J'ai réalisé ce site web entièrement par moi-même, en utilisant React (vite.js), le TypeScript, le CSS/SASS, et le tout hébergé sur GitHub.",
      portfolioTechnologies: [
        { name: "React", icon: "/react.png" },
        { name: "Vite", icon: "/vite.png" },
        { name: "TypeScript", icon: "/typescript.png" },
        { name: "SASS", icon: "/sass.png" },
        { name: "CSS", icon: "/css.png" },
        { name: "GitHub", icon: "/github.png" },
      ],
    }}
  />
);

Project1Page.pageId = 1;
