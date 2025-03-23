import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";

export const Project2Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={2}
    projectInfo="Projet de cours : Workshop avec le département de la Loire"
    projectImage={{
      src: "/mockup-hirogo.png",
      alt: "IMAGE",
    }}
    projectTitle="HiroGo"
    projectDescription={
      <>
        <strong>HiroGo</strong> est une application que j'ai développée et en
        partie designée lors d'un Workshop de groupe en partenariat avec le
        département de la Loire. L'objectif de ce projet était de promouvoir les
        mobilités douces auprès des jeunes.
        <br />
        Avec HiroGo, les utilisateurs peuvent :
        <ul>
          <li>
            <strong>Trouver des itinéraires sécurisés</strong>
          </li>
          <li>
            <strong>Consulter la météo</strong> pour planifier leurs trajets
          </li>
          <li>
            <strong>Découvrir des points d'intérêt</strong> tout au long de leur
            parcours
          </li>
        </ul>
        Pour encourager l'utilisation du vélo, HiroGo intègre un système de{" "}
        <strong>score</strong>, de <strong>quêtes quotidiennes</strong>, de{" "}
        <strong>récompenses</strong> et un <strong>classement</strong> pour
        motiver les jeunes à parcourir toujours plus de trajets.
        <br></br>
        Enfin, l'application propose une<strong> section Activités </strong>
        permettant aux jeunes de participer à des événements organisés par les
        institutions publiques locales, comme les collèges ou les centres de
        loisirs.
        {/* ... reste de la description ... */}
      </>
    }
    projectTech="HTML, CSS, JavaScript, MapBox API, OpenStreetMap API, OpenWeatherMap API, GitHub"
    modalContent={{
      title: "Détails du projet",
      description:
        "Tout au long de ce portfolio vous pourrez cliquer sur les images de présentation des différents projets pour en savoir plus, et même tester certaines applications !",
      aboutProjectTitle: "À propos de ce site",
      aboutProject: "Captures d'écran du projet HiroGo",
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

Project2Page.pageId = 2;
