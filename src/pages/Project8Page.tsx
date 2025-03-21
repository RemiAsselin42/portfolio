import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";

export const Project8Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={8}
    projectInfo="Projet de cours : Design graphique - Charte graphique"
    projectImage={{
      src: "/bbv-olsberg.png",
      alt: "Mockup BBV Olsberg - Club de basket allemand",
    }}
    projectTitle="BBV Olsberg"
    projectDescription={
      <>
        <strong>BBV Olsberg</strong> est un projet de design graphique réalisé
        dans le cadre de mes cours. L'objectif était de créer une charte
        graphique complète à partir de deux contraintes tirées au sort :
        <br />• <strong>Brief</strong> : Un club de basket allemand fictif.
        <br />• <strong>Thème</strong> : Style rétro/néon.
        <br />
        <br />
        J'ai développé une identité visuelle complète comprenant :
        <br />• <strong>Logo</strong> représentant l'identité du club.
        <br />• <strong>Palette de couleurs</strong> inspirée des ambiances néon
        des années 80/90.
        <br />• <strong>Typographies</strong> sélectionnées pour renforcer
        l'aspect rétro.
        <br />• <strong>Éléments graphiques</strong> rappelant l'univers du
        basket tout en conservant l'esthétique rétro/néon.
      </>
    }
    projectTech="Adobe Illustrator, Adobe InDesign, Adobe Photoshop, Design graphique, Charte graphique"
    modalContent={{
      title: "Détails du projet",
      description:
        "Tout au long de ce portfolio vous pourrez cliquer sur les images de présentation des différents projets pour en savoir plus, et même tester certaines applications !",
      aboutProjectTitle: "À propos de cette charte graphique",
      aboutProject:
        "Ce projet m'a permis d'explorer l'univers visuel des années 80/90 tout en l'adaptant à un club sportif contemporain. J'ai recherché des références historiques du design de cette époque pour m'imprégner de ses codes visuels caractéristiques : couleurs vives, effets néon, typographies marquées et compositions géométriques. La difficulté était de créer une identité qui soit à la fois nostalgique et fonctionnelle pour un club de basket moderne.",
      portfolioTechnologies: [
        { name: "Illustrator", icon: "/illustrator.png" },
        { name: "InDesign", icon: "/indesign.png" },
        { name: "Photoshop", icon: "/photoshop.png" },
      ],
    }}
  />
);

Project8Page.pageId = 8;
