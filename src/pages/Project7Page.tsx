import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";
import { VideoPlayer } from "../components/VideoPlayer";
import { LazyImageComponent } from "../components";

export const Project7Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={7}
    projectInfo="Projet de cours&nbsp;:&nbsp;Production audiovisuelle pour réseaux sociaux"
    customMedia={
      <VideoPlayer
        src="hopecore-tiktok.mp4"
        poster="/hopecore-poster.webp"
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
    modalContent={
      <div className="hopecore-modal-content">
        <h1>Projet Hopecore TikTok</h1>

        <section className="modal-section">
          <h2>Présentation du projet</h2>
          <p>
            Ce projet audiovisuel a été réalisé dans le cadre de mes cours de
            production vidéo. L'objectif était de créer un contenu adapté aux
            réseaux sociaux actuels, en maîtrisant les codes visuels et
            narratifs spécifiques à ces plateformes.
          </p>
          <p>
            J'ai choisi de me concentrer sur l'esthétique "hopecore", un style
            très populaire sur TikTok qui se caractérise par un montage
            dynamique, des transitions rapides, une colorimétrie particulière et
            une ambiance visuelle immersive.
          </p>
        </section>

        <section className="modal-section">
          <h2>Processus de création</h2>
          <p>
            La réalisation de cette vidéo s'est déroulée en plusieurs étapes
            clés&nbsp;:
          </p>
          <ul className="features-list">
            <li>
              <strong>Pré-production</strong>&nbsp;:&nbsp;Recherche sur
              l'esthétique hopecore, création d'un storyboard, repérage des
              lieux de tournage et planification des séquences
            </li>
            <li>
              <strong>Tournage</strong>&nbsp;:&nbsp;Captation de plus de 1h30 de
              rush sur 2 jours intensifs, avec une attention particulière aux
              mouvements de caméra et aux détails visuels
            </li>
            <li>
              <strong>Montage</strong>&nbsp;:&nbsp;Sélection des meilleurs plans
              et assemblage selon le rythme caractéristique du style hopecore
            </li>
            <li>
              <strong>Post-production</strong>&nbsp;:&nbsp;Travail approfondi
              sur la colorimétrie, ajout d'effets visuels, synchronisation avec
              la musique et mixage sonore
            </li>
          </ul>
        </section>

        <section className="modal-section">
          <h2>Équipement utilisé</h2>
          <div className="equipment-grid">
            <div className="equipment-item">
              <h3>Canon 77D</h3>
              <p>
                Appareil photo reflex numérique utilisé comme caméra principale
                pour sa qualité d'image et sa flexibilité en conditions
                variables
              </p>
            </div>
            <div className="equipment-item">
              <h3>Objectifs</h3>
              <p>
                Sigma 17-50mm f/2.8 pour les plans larges et moyens
                <br />
                Canon 55-250mm pour les plans serrés et détails éloignés
                <br />
                Tamron 90mm f/2.8 Macro 1:1 pour les gros plans et détails
              </p>
            </div>
            <div className="equipment-item">
              <h3>Stabilisation</h3>
              <p>
                Combinaison de prises à main levée pour les mouvements
                organiques et de trépied pour les plans fixes nécessitant de la
                stabilité
              </p>
            </div>
            <div className="equipment-item">
              <h3>Éclairage</h3>
              <p>
                Utilisation majoritaire de lumière naturelle complétée par des
                sources d'appoint pour créer l'ambiance visuelle spécifique
              </p>
            </div>
          </div>
        </section>

        <section className="modal-section">
          <h2>Technologies utilisées</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <LazyImageComponent
                src="/premiere.webp"
                alt="Adobe Premiere Pro"
                className="tech-icon"
                sizes="60px"
              />
              <span>Premiere Pro</span>
            </div>
            <div className="tech-item">
              <LazyImageComponent
                src="/aftereffects.webp"
                alt="After Effects"
                className="tech-icon"
                sizes="60px"
              />
              <span>After Effects</span>
            </div>
            <div className="tech-item">
              <LazyImageComponent
                src="/audition.webp"
                alt="Adobe Audition"
                className="tech-icon"
                sizes="60px"
              />
              <span>Audition</span>
            </div>
            <div className="tech-item">
              <LazyImageComponent
                src="/canon.webp"
                alt="Canon"
                className="tech-icon"
                sizes="60px"
              />
              <span>Canon</span>
            </div>
          </div>
        </section>

        <section className="modal-section">
          <h2>Challenges techniques</h2>
          <p>
            La création d'une vidéo hopecore présente plusieurs défis techniques
            spécifiques&nbsp;:
          </p>
          <ul className="features-list">
            <li>
              <strong>Montage rythmique</strong>&nbsp;:&nbsp;Synchronisation
              précise des transitions avec la musique pour créer une expérience
              immersive
            </li>
            <li>
              <strong>Colorimétrie avancée</strong>&nbsp;:&nbsp;Création d'un
              look visuel cohérent et distinctif à travers des corrections de
              couleur complexes
            </li>
            <li>
              <strong>Compression efficace</strong>&nbsp;:&nbsp;Optimisation de
              la qualité vidéo pour les plateformes de réseaux sociaux sans
              perdre l'impact visuel
            </li>
            <li>
              <strong>Narration condensée</strong>&nbsp;:&nbsp;Communication
              d'une ambiance et d'émotions dans un format ultra-court de 45
              secondes
            </li>
          </ul>
        </section>

        <section className="modal-section">
          <h2>Résultats et apprentissage</h2>
          <p>
            Ce projet m'a permis de développer des compétences techniques
            avancées en production audiovisuelle, notamment dans la gestion du
            rythme, la colorimétrie et l'optimisation des contenus pour les
            réseaux sociaux.
          </p>
          <p>
            J'ai également approfondi ma compréhension des tendances visuelles
            contemporaines et des attentes des audiences sur les plateformes
            comme TikTok, où l'impact visuel immédiat et l'originalité sont
            essentiels pour capter l'attention dans un environnement numérique
            saturé.
          </p>
          <p>
            Cette expérience m'a confirmé l'importance de maîtriser l'ensemble
            de la chaîne de production, depuis la conception jusqu'à la
            diffusion, pour créer des contenus audiovisuels efficaces et
            impactants.
          </p>
        </section>
      </div>
    }
  />
);

Project7Page.pageId = 7;
