import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";

export const Project8Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={8}
    projectInfo="Projet de cours&nbsp;:&nbsp;Design graphique - Charte graphique"
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
        <br />• <strong>Brief</strong>&nbsp;:&nbsp;Un club de basket allemand
        fictif.
        <br />• <strong>Thème</strong>&nbsp;:&nbsp;Style rétro/néon.
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
    modalContent={
      <div className="bbv-olsberg-modal-content">
        <h1>Charte graphique BBV Olsberg</h1>

        <section className="modal-section">
          <h2>Présentation du projet</h2>
          <p>
            Ce projet a été réalisé dans le cadre d'un cours de design graphique
            où l'objectif était de créer une identité visuelle complète pour une
            entité fictive. Chaque étudiant devait tirer au sort deux
            contraintes&nbsp;:&nbsp;un type d'entreprise/organisation et un
            style visuel.
          </p>
          <p>
            J'ai reçu comme contraintes un "club de basket allemand" et un
            "style rétro/néon". Le défi était de combiner ces deux éléments pour
            créer une identité cohérente, attrayante et fonctionnelle pour ce
            club sportif imaginaire.
          </p>
        </section>

        <section className="modal-section">
          <h2>Le processus créatif</h2>
          <p>
            La création de cette identité visuelle s'est déroulée en plusieurs
            étapes clés :
          </p>
          <ul className="features-list">
            <li>
              <strong>Phase de recherche</strong>&nbsp;:&nbsp;Exploration des
              codes visuels du basket-ball, de la culture allemande et de
              l'esthétique rétro/néon des années 80-90
            </li>
            <li>
              <strong>Conception du logo</strong>&nbsp;:&nbsp;Développement d'un
              symbole visuel fort combinant éléments du basket et style néon
              avec une typographie adaptée
            </li>
            <li>
              <strong>Définition de la palette chromatique</strong>
              &nbsp;:&nbsp;Sélection de couleurs vives et contrastées évoquant
              les enseignes lumineuses et l'ambiance des années 80
            </li>
            <li>
              <strong>Création des supports</strong>&nbsp;:&nbsp;Déclinaison de
              l'identité sur différents éléments comme affiches, équipements
              sportifs et communication digitale
            </li>
          </ul>
        </section>

        <section className="modal-section">
          <h2>Éléments de la charte graphique</h2>
          <div className="elements-grid">
            <div className="element-item">
              <h3>Logo</h3>
              <p>
                Le logo combine un ballon de basket stylisé avec des éléments
                néon et des lignes dynamiques évoquant le mouvement. Les
                initiales "BBV" sont intégrées dans un style rétro avec des
                effets lumineux rappelant les enseignes des années 80.
              </p>
            </div>
            <div className="element-item">
              <h3>Couleurs</h3>
              <p>
                La palette se compose principalement de bleu néon électrique,
                rose fluo et jaune vif sur fond sombre, créant un contraste fort
                caractéristique de l'ère des synthwave et de l'esthétique
                rétrofuturiste.
              </p>
            </div>
            <div className="element-item">
              <h3>Typographie</h3>
              <p>
                Utilisation de polices sans-serif géométriques pour le texte
                courant et de typographies display audacieuses aux angles
                prononcés pour les titres, rappelant les affiches des années 80.
              </p>
            </div>
            <div className="element-item">
              <h3>Éléments graphiques</h3>
              <p>
                Des motifs géométriques inspirés des courts de basket, des
                grilles en perspective et des lignes lumineuses constituent les
                éléments décoratifs de l'identité visuelle.
              </p>
            </div>
          </div>
        </section>

        <section className="modal-section">
          <h2>Applications</h2>
          <p>
            La charte graphique a été déclinée sur différents supports pour
            montrer sa polyvalence :
          </p>
          <div className="project-gallery">
            <div className="gallery-item">
              <img src="/bbv-olsberg-logo.png" alt="Logo BBV Olsberg" />
              <span>Logo principal</span>
            </div>
            <div className="gallery-item">
              <img
                src="/bbv-olsberg-colors.png"
                alt="Palette de couleurs BBV Olsberg"
              />
              <span>Palette chromatique</span>
            </div>
            <div className="gallery-item">
              <img src="/bbv-olsberg-jersey.png" alt="Maillot BBV Olsberg" />
              <span>Maquette des maillots</span>
            </div>
            <div className="gallery-item">
              <img
                src="/bbv-olsberg-poster.png"
                alt="Affiche événement BBV Olsberg"
              />
              <span>Affiche d'événement</span>
            </div>
            <div className="gallery-item">
              <img
                src="/bbv-olsberg-social.png"
                alt="Visuels réseaux sociaux BBV Olsberg"
              />
              <span>Posts réseaux sociaux</span>
            </div>
            <div className="gallery-item">
              <img
                src="/bbv-olsberg-branding.png"
                alt="Applications de la charte graphique"
              />
              <span>Applications diverses</span>
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
          </div>
        </section>

        <section className="modal-section">
          <h2>Apprentissages et défis</h2>
          <p>
            Ce projet m'a permis d'explorer en profondeur l'univers visuel des
            années 80/90 tout en l'adaptant à un contexte sportif contemporain.
            J'ai dû trouver le juste équilibre entre un style rétro marqué et
            les exigences fonctionnelles d'une identité de club sportif.
          </p>
          <p>
            Le principal défi consistait à créer une esthétique nostalgique mais
            qui reste pertinente et attractive pour un public actuel. J'ai
            également dû veiller à ce que tous les éléments graphiques
            fonctionnent aussi bien en format numérique que sur des supports
            physiques comme les maillots ou les affiches.
          </p>
          <p>
            Cette expérience m'a permis de développer mes compétences en
            recherche créative, en cohérence graphique et en adaptation d'une
            identité visuelle à différents supports et contextes.
          </p>
        </section>
      </div>
    }
  />
);

Project8Page.pageId = 8;
