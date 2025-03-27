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
    modalContent={
      <div className="yan-archi-modal-content">
        <h1>Refonte d'identité visuelle Yan Archi</h1>

        <section className="modal-section">
          <h2>Présentation du projet</h2>
          <p>
            Ce projet de refonte d'identité visuelle a été réalisé lors d'un stage au sein du 
            cabinet Yan Archi, un cabinet d'architecture et d'urbanisme basé à Saint-Étienne. 
            L'objectif était de moderniser l'image du cabinet tout en conservant son 
            professionnalisme et son expertise reconnue dans le domaine de l'architecture.
          </p>
          <p>
            Face à un marché de plus en plus concurrentiel, le cabinet avait besoin de 
            se démarquer visuellement, tout en reflétant sa philosophie : allier 
            innovation architecturale et respect du patrimoine local.
          </p>
        </section>

        <section className="modal-section">
          <h2>Processus de création</h2>
          <p>
            La refonte de cette identité visuelle s'est déroulée en plusieurs étapes clés :
          </p>
          <ul className="features-list">
            <li>
              <strong>Analyse et audit</strong> : Étude approfondie de l'identité existante
              et de son positionnement dans le secteur
            </li>
            <li>
              <strong>Recherche créative</strong> : Exploration de différentes directions 
              graphiques en accord avec les valeurs du cabinet
            </li>
            <li>
              <strong>Développement du logo</strong> : Création d'un symbole visuel fort 
              associé à une typographie soigneusement sélectionnée
            </li>
            <li>
              <strong>Déclinaison sur supports</strong> : Application de la nouvelle identité 
              sur l'ensemble des communications du cabinet
            </li>
          </ul>
        </section>

        <section className="modal-section">
          <h2>Éléments créés</h2>
          <div className="elements-grid">
            <div className="element-item">
              <h3>Logo</h3>
              <p>
                Création d'un logo combinant géométrie architecturale et élégance,
                utilisant des formes épurées pour évoquer la construction et le design.
              </p>
            </div>
            <div className="element-item">
              <h3>Charte graphique</h3>
              <p>
                Définition d'une palette de couleurs, de typographies et de règles d'usage
                pour garantir la cohérence visuelle sur tous les supports.
              </p>
            </div>
            <div className="element-item">
              <h3>Planches projets</h3>
              <p>
                Conception de templates pour la présentation des réalisations architecturales,
                mettant en valeur plans, rendus 3D et photographies des bâtiments.
              </p>
            </div>
            <div className="element-item">
              <h3>Papeterie</h3>
              <p>
                Design de cartes de visite, papier à en-tête, signatures de mail
                et autres éléments de communication professionnelle.
              </p>
            </div>
          </div>
        </section>

        <section className="modal-section">
          <h2>Technologies utilisées</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <img src="/illustrator.png" alt="Adobe Illustrator" />
              <span>Illustrator</span>
            </div>
            <div className="tech-item">
              <img src="/indesign.png" alt="Adobe InDesign" />
              <span>InDesign</span>
            </div>
            <div className="tech-item">
              <img src="/photoshop.png" alt="Adobe Photoshop" />
              <span>Photoshop</span>
            </div>
            <div className="tech-item">
              <img src="/figma.png" alt="Figma" />
              <span>Figma</span>
            </div>
          </div>
        </section>

        <section className="modal-section">
          <h2>Réalisations</h2>
          <p>
            Voici un aperçu des différents éléments graphiques créés pour le cabinet Yan Archi :
          </p>
          <div className="project-gallery">
            <div className="gallery-item">
              <img src="/yan-archi-logo.png" alt="Logo Yan Archi" />
              <span>Logo principal</span>
            </div>
            <div className="gallery-item">
              <img src="/yan-archi-colors.png" alt="Palette de couleurs Yan Archi" />
              <span>Palette de couleurs</span>
            </div>
            <div className="gallery-item">
              <img src="/yan-archi-typo.png" alt="Typographies Yan Archi" />
              <span>Typographies</span>
            </div>
            <div className="gallery-item">
              <img src="/yan-archi-template.png" alt="Template de planche projet Yan Archi" />
              <span>Template de planche projet</span>
            </div>
            <div className="gallery-item">
              <img src="/yan-archi-business-card.png" alt="Carte de visite Yan Archi" />
              <span>Carte de visite</span>
            </div>
            <div className="gallery-item">
              <img src="/yan-archi-letterhead.png" alt="Papier à en-tête Yan Archi" />
              <span>Papier à en-tête</span>
            </div>
          </div>
        </section>

        <section className="modal-section">
          <h2>Résultats et impact</h2>
          <p>
            Cette refonte a permis à Yan Archi de moderniser son image tout en conservant 
            l'essence de son expertise. La nouvelle identité visuelle a contribué à renforcer 
            la visibilité du cabinet sur le marché local et à améliorer sa communication 
            avec ses clients et partenaires.
          </p>
          <p>
            J'ai travaillé en étroite collaboration avec l'architecte tout au long du processus,
            pour comprendre sa vision et traduire ses valeurs en éléments visuels cohérents 
            et impactants.
          </p>
          <p>
            Ce projet m'a permis d'approfondir mes compétences en design graphique appliqué 
            au secteur de l'architecture, ainsi que ma capacité à développer une identité 
            visuelle complète et cohérente répondant aux besoins spécifiques d'une entreprise.
          </p>
        </section>
      </div>
    }
  />
);

Project4Page.pageId = 4;