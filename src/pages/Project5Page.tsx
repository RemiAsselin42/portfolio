import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";

export const Project5Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={5}
    projectInfo="Stage professionnel : Web Design & Développement Front-end"
    projectImage={{
      src: "/geopostcodes.png",
      alt: "Stage GeoPostcodes",
    }}
    projectTitle="GeoPostcodes"
    projectDescription={
      <>
        Pendant mon <strong>stage chez GeoPostcodes</strong>, j'ai occupé un
        double rôle de web designer et développeur front-end, tout en
        participant à l'amélioration du SEO. Mes missions comprenaient :
        <br />• <strong>Webdesign et optimisation</strong> - Création et
        modification de pages web sur WordPress avec Elementor, amélioration du
        référencement (SEO), optimisation des performances du site web, et
        conception UX/UI.
        <br />• <strong>Développement frontend</strong> - Développement de pages
        en React.js (TypeScript), création d'une carte interactive avec MapBox
        (de la conception Figma jusqu'au développement).
        <br />• <strong>Outils spécialisés</strong> - Mise en place d'un "Zip
        Code Looker" permettant la recherche efficace de données géographiques
        dans la base de données de l'entreprise.
        <br />
        Ce stage m'a permis de mettre en pratique des compétences variées et de
        contribuer à l'amélioration d'un service utilisé à l'échelle
        internationale.
      </>
    }
    projectTech="WordPress, Elementor, React.js, TypeScript, Figma, MapBox, HTML, CSS, SEO"
    modalContent={{
      title: "Détails du stage",
      description:
        "Tout au long de ce portfolio vous pourrez cliquer sur les images de présentation des différents projets pour en savoir plus, et même tester certaines applications &nbsp;!",
      aboutProjectTitle: "À propos de ce stage",
      aboutProject:
        "GeoPostcodes est une entreprise spécialisée dans les données géographiques et postales. Mon rôle a été d'améliorer l'expérience utilisateur de leur plateforme et de développer de nouvelles fonctionnalités interactives pour faciliter l'accès à leurs données. J'ai notamment conçu une carte interactive permettant aux utilisateurs de visualiser et d'interroger facilement les données géographiques.",
      portfolioTechnologies: [
        { name: "WordPress", icon: "/wordpress.png" },
        { name: "React", icon: "/react.png" },
        { name: "TypeScript", icon: "/typescript.png" },
        { name: "Figma", icon: "/figma.png" },
        { name: "MapBox", icon: "/mapbox.png" },
        { name: "SEO", icon: "/seo.png" },
      ],
    }}
  />
);

Project5Page.pageId = 5;
