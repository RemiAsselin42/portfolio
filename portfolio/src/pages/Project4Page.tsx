import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";

export const Project4Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={4}
    projectInfo="Projet de stage : Refonte de charte graphique"
    projectImage={{
      src: "/yan-archi.png",
      alt: "Refonte charte graphique Yan Archi",
    }}
    projectTitle="Yan Archi"
    projectDescription={
      <>
        Pendant mon <strong>stage</strong> chez Yan Archi, architecte urbaniste
        à Saint-Etienne, j'ai réalisé une{" "}
        <strong>refonte complète de l'identité visuelle</strong> de son cabinet.
        Ce projet a englobé :
        <br />• <strong>Création d'un nouveau logo</strong> alliant modernité et
        élégance, reflétant les valeurs du cabinet.
        <br />• <strong>Design des planches projets</strong> pour présenter
        efficacement les réalisations architecturales.
        <br />• <strong>Templates de communication</strong> incluant designs de
        mails professionnels et courriers officiels.
        <br />• <strong>Harmonisation des supports visuels</strong> pour
        garantir une cohérence sur l'ensemble des communications.
        <br />
        L'objectif était de créer une identité visuelle distinctive et
        professionnelle pour renforcer la présence du cabinet sur le marché
        local.
      </>
    }
    projectTech="Adobe InDesign, Adobe Illustrator, Adobe Photoshop, Figma"
    modalContent={{
      title: "",
      description: "",
      aboutProjectTitle: "À propos de ce projet",
      aboutProject:
        "Cette refonte a permis à Yan Archi de moderniser son image tout en conservant l'essence de son expertise. J'ai travaillé en étroite collaboration avec l'architecte pour comprendre sa vision et traduire ses valeurs en éléments visuels cohérents et impactants.",
      portfolioTechnologies: [
        { name: "Illustrator", icon: "/illustrator.png" },
        { name: "InDesign", icon: "/indesign.png" },
        { name: "Photoshop", icon: "/photoshop.png" },
        { name: "Figma", icon: "/figma.png" },
      ],
    }}
  />
);

Project4Page.pageId = 4;
