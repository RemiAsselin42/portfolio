import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";
import { LazyImageComponent } from "../components";

export const Project4Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={4}
    projectInfo="Projet de stage&nbsp;:&nbsp;Refonte de charte graphique"
    projectImage={{
      src: "/yan-archi.webp",
      alt: "Stage chez Yan Olivares Architecture",
    }}
    projectTitle="Yan Olivares Architecture"
    projectDescription={
      <p>
        Pendant mon <strong>stage</strong> chez Yan Olivares Architecture,
        architecte urbaniste à Saint-Etienne, j'ai réalisé une{" "}
        <strong>refonte complète de l'identité visuelle</strong> de son cabinet.
        Ce projet a englobé&nbsp;:
        <br />• <strong>Création d'un nouveau logo</strong> alliant le nom de
        l'architect à une forme de tampon à encre japonais.
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
      </p>
    }
    projectTech="Adobe InDesign, Adobe Illustrator, Adobe Photoshop, Figma"
    modalContent={
      <div className="yan-archi-modal-content">
        <h1>Refonte d'identité visuelle Yan Olivares Architecture</h1>

        <section className="modal-section">
          <h2>Présentation du projet</h2>
          <p>
            Ce projet de refonte d'identité visuelle a été réalisé lors d'un
            stage au sein du cabinet Yan Archi, un cabinet d'architecture et
            d'urbanisme basé à Saint-Étienne. L'objectif était de moderniser
            l'image du cabinet tout en conservant les couleurs et en respectant
            au mieux la vision de l'architecte.
          </p>
        </section>

        {/* <section className="modal-section">
          <h2>Processus de création</h2>
          <p>
            La refonte de cette identité visuelle s'est déroulée en plusieurs
            étapes clés :
          </p>
          <ul className="features-list">
            <li>
              <strong>Recherche créative</strong>&nbsp;:&nbsp;Exploration de
              différentes directions graphiques en accord avec les valeurs du
              cabinet
            </li>
            <li>
              <strong>Développement du logo</strong>&nbsp;:&nbsp;Création d'un
              symbole visuel fort associé à une typographie soigneusement
              sélectionnée
            </li>
            <li>
              <strong>Déclinaison sur supports</strong>&nbsp;:&nbsp;Application
              de la nouvelle identité sur l'ensemble des communications du
              cabinet
            </li>
          </ul>
        </section> */}

        <section className="modal-section">
          <h2>Éléments créés</h2>
          <div className="elements-grid">
            <div className="element-item">
              <h3>Logo</h3>
              <p>
                Création d'un logo combinant géométrie architecturale, une forme
                de tampon à encre japonais et le nom de l'architecte.
              </p>
            </div>
            <div className="element-item">
              <h3>Charte graphique</h3>
              <p>
                Définition d'une palette de couleurs, de typographies et de
                règles d'usage pour garantir la cohérence visuelle sur tous les
                supports.
              </p>
            </div>
            <div className="element-item">
              <h3>Planches projets</h3>
              <p>
                Conception de templates pour la présentation des réalisations
                architecturales, mettant en valeur plans, rendus 3D et
                photographies des bâtiments.
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
              <img src="/illustrator.webp" alt="Adobe Illustrator" />
              <span>Illustrator</span>
            </div>
            <div className="tech-item">
              <img src="/indesign.webp" alt="Adobe InDesign" />
              <span>InDesign</span>
            </div>
            <div className="tech-item">
              <img src="/photoshop.webp" alt="Adobe Photoshop" />
              <span>Photoshop</span>
            </div>
            <div className="tech-item">
              <img src="/figma.webp" alt="Figma" />
              <span>Figma</span>
            </div>
          </div>
        </section>

        <section className="modal-section">
          <h2>Réalisations</h2>
          <p>
            Voici un aperçu des différents éléments graphiques créés pour le
            cabinet Yan Archi&nbsp;:
          </p>
          <div className="project-gallery">
            <div className="gallery-item">
              <LazyImageComponent
                src="/yan-archi-logo.webp"
                alt="Logo Yan Archi"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 352px"
              />
              <span>Logo principal</span>
            </div>
            <div className="gallery-item">
              <LazyImageComponent
                src="/yan-archi-courrier-template.webp"
                alt="Template de planche projet Yan Archi"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 352px"
              />
              <span>Template des courriers</span>
            </div>
            <div className="gallery-item">
              <LazyImageComponent
                src="/yan-archi-business-card.webp"
                alt="Carte de visite Yan Archi"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 352px"
              />
              <span>Carte de visite</span>
            </div>
          </div>
          <div className="project-gallery-full">
            <div className="gallery-item">
              <LazyImageComponent
                src="/yan-archi-template-2.webp"
                alt="Template de planche projet Yan Archi"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1168px"
              />
              <span>Template de planche projet</span>
            </div>
          </div>
        </section>

        <section className="modal-section">
          <h2>Conclusion</h2>
          <p>
            Cette refonte a permis à Yan Olivares Architecture de moderniser son
            image tout en conservant les couleurs de l'agence. La nouvelle
            identité visuelle a contribué à améliorer les supports de
            communication de l'architecte, et à harmoniser son portfolio de
            projets.
          </p>
          <p>
            J'ai travaillé en étroite collaboration avec l'architecte tout au
            long du processus, pour comprendre sa vision et traduire ses valeurs
            en éléments visuels cohérents et impactants.
          </p>
          <p>
            Ce projet m'a permis d'approfondir mes compétences en design
            graphique, ainsi que ma capacité à développer une identité visuelle
            complète et cohérente répondant aux besoins spécifiques d'une
            entreprise.
          </p>
        </section>
      </div>
    }
  />
);

Project4Page.pageId = 4;
