import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";

export const Project6Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={6}
    projectInfo="Projet de cours : Application web dynamique en PHP"
    projectImage={{
      src: "/hyxe.png",
      alt: "Mockup Hyxe - Clone de Twitter",
    }}
    projectTitle="Hyxe"
    projectDescription={
      <>
        <strong>Hyxe</strong> est un projet de cours réalisé en duo, centré sur
        l'apprentissage du PHP et la création d'applications dynamiques. Il
        s'agit d'une réplique simplifiée de Twitter avec :
        <br />• <strong>Publication de messages</strong> similaires aux tweets.
        <br />• <strong>Système de réponses</strong> permettant d'interagir avec
        les publications d'autres utilisateurs.
        <br />• <strong>Fonctionnalité de likes</strong> pour les publications
        (en cours de développement).
        <br />• <strong>Système d'inscription et connexion</strong> pour gérer
        les utilisateurs (en cours de développement).
        <br />
        Ce projet nous a permis d'appliquer nos connaissances en PHP en créant
        une application web entièrement fonctionnelle avec gestion de base de
        données.
      </>
    }
    projectTech="PHP, CSS, SQL, MySQL, HTML, Git"
    modalContent={{
      title: "Détails du projet",
      description:
        "Tout au long de ce portfolio vous pourrez cliquer sur les images de présentation des différents projets pour en savoir plus, et même tester certaines applications !",
      aboutProjectTitle: "À propos de Hyxe",
      aboutProject:
        "L'objectif principal de ce projet était d'apprendre à développer une application web dynamique avec PHP et SQL. Nous avons choisi de reproduire l'interface et les fonctionnalités de base de Twitter pour relever un défi technique intéressant tout en travaillant sur une plateforme connue. Ce projet m'a permis de développer mes compétences en PHP et en gestion de bases de données relationnelles.",
      portfolioTechnologies: [
        { name: "PHP", icon: "/php.png" },
        { name: "SQL", icon: "/sql.png" },
        { name: "CSS", icon: "/css.png" },
        { name: "HTML", icon: "/html.png" },
        { name: "Git", icon: "/git.png" },
      ],
    }}
  />
);

Project6Page.pageId = 6;
