import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";
import { VideoPlayer } from "../components/VideoPlayer";

export const Project7Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={7}
    projectInfo="Projet de cours : Production audiovisuelle pour réseaux sociaux"
    customMedia={
      <VideoPlayer
        src="hopecore-tiktok.mp4"
        poster="/hopecore-poster.png"
        className="project-video"
      />
    }
    projectTitle="Hopecore TikTok"
    projectDescription={
      <>
        <strong>Projet audiovisuel</strong> réalisé dans le cadre de mes cours,
        visant à reproduire un contenu tendance sur les réseaux sociaux actuels.
        J'ai choisi de créer une vidéo de style <strong>"hopecore"</strong>,
        très populaire sur TikTok.
        <br />• <strong>Réalisation complète</strong> - J'ai filmé tous les
        plans avec un Canon 77D, équipé d'un 17/50mm SIgma, d'un 55/250mm Canon
        et d'un objectif macro 90mm 1:1 Tamron.
        <br />• <strong>Production intensive</strong> - Le tournage s'est
        déroulé sur 2 jours, générant environ 1h30 de rush.
        <br />• <strong>Post-production</strong> - Montage entièrement réalisé
        sur Adobe Premiere Pro, incluant derush, montage, colorimétrie et
        intégration musicale.
        <br />• <strong>Format final</strong> - Le contenu brut a été transformé
        en une vidéo TikTok percutante de 45 secondes.
        <br />
        Ce projet m'a permis de maîtriser l'ensemble de la chaîne de production
        audiovisuelle, de la captation à la finalisation d'un contenu adapté aux
        codes des réseaux sociaux.
      </>
    }
    projectTech="Adobe Premiere Pro, Caméra Canon, Techniques de montage, Colorimétrie, Sound Design"
    modalContent={{
      title: "Détails du projet",
      description:
        "Tout au long de ce portfolio vous pourrez cliquer sur les images de présentation des différents projets pour en savoir plus, et même tester certaines applications !",
      aboutProjectTitle: "À propos de ce projet vidéo",
      aboutProject:
        "L'esthétique 'hopecore' se caractérise par un montage dynamique, des transitions rapides et une ambiance visuelle particulière. Ce projet m'a demandé environ 6 heures de post-production pour transformer 1h30 de rush en une vidéo de 45 secondes qui respecte les codes de ce style très populaire sur TikTok. J'ai géré l'ensemble du processus créatif, du storyboard à l'exportation finale en passant par la colorimétrie et le choix musical.",
      portfolioTechnologies: [{ name: "Premiere Pro", icon: "/premiere.png" }],
    }}
  />
);

Project7Page.pageId = 7;
