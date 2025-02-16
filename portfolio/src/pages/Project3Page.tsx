import { PageProps } from "../types/PageTypes";

export const Project3Page = ({ onNextPage }: PageProps) => {
  return (
    <div className="project-container" id="project-3">
      <h3 className="project-info">Projet de cours : La Grimpette</h3>
      <div className="project-layout" id="project-la-grimpette-layout">
        <div className="project-image" id="project-la-grimpette-image">
          <img
            src="/mockup-la-grimpette.png"
            alt="La Grimpette"
            className="project-image"
          />
        </div>
        <div className="project-text" id="project-la-grimpette-text">
          <h2 className="project-title">La Grimpette</h2>
          <p className="project-description">
            <strong>La Grimpette</strong> est un projet de cours autour du PHP
            et du SQL. Il s'agit du site d'un club d'escalade fictif. Ce projet
            comprend deux volets essentiels&nbsp;:
            <br />
            <br />• <strong>Un site front</strong> qui présente le club, ses
            activités et événements avec la posibilité de s'y inscrire.
            <br />• <strong>Un site backoffice</strong> dédié à la gestion des
            inscriptions et des activités. On peut par exemple y ajouter des
            activités, les modifier, les supprimer, valdier les inscriptions,
            les refuser, et voir les activités et inscriptions passées.
            <br />
            <br />
            Le design du site a été fait au préalable sur Figma.
          </p>
          <p className="project-tech">
            Figma, HTML, CSS, SCSS, JavaScript, React (Vite), JSON, PHP, SQL,
            WAMP, GitHub
          </p>
          <div className="project-button">
            <button className="next-button" onClick={onNextPage}>
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Project3Page.pageId = 3;
