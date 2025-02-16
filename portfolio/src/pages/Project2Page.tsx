import { PageProps } from "../types/PageTypes";

export const Project2Page = ({ onNextPage }: PageProps) => {
  return (
    <div className="project-container" id="project-2">
      <h3 className="project-info">
        Projet de cours : Workshop avec le département de la Loire
      </h3>
      <div className="project-layout" id="project-1">
        <div className="project-image" id="project-1-image">
          <img src="/mockup-hirogo.png" alt="IMAGE" className="project-image" />{" "}
        </div>
        <div className="project-text" id="project-1-text">
          <h2 className="project-title">HiroGo</h2>
          <p className="project-description">
            <strong>HiroGo</strong> est une application que j'ai développée et
            en partie designée lors d'un Workshop de groupe en partenariat avec
            le département de la Loire. L'objectif de ce projet était de
            promouvoir les mobilités douces auprès des jeunes.
            <br></br>Avec HiroGo, les utilisateurs peuvent :
            <ul>
              <li>
                <strong>Trouver des itinéraires sécurisés</strong>
              </li>
              <li>
                <strong>Consulter la météo</strong> pour planifier leurs trajets
              </li>
              <li>
                <strong>Découvrir des points d'intérêt</strong> tout au long de
                leur parcours
              </li>
            </ul>
            Pour encourager l'utilisation du vélo, HiroGo intègre un système de{" "}
            <strong>score</strong>, de <strong>quêtes quotidiennes</strong>, de{" "}
            <strong>récompenses</strong> et un <strong>classement</strong> pour
            motiver les jeunes à parcourir toujours plus de trajets.
            <br></br>
            Enfin, l'application propose une <strong>
              section Activités
            </strong>{" "}
            permettant aux jeunes de participer à des événements organisés par
            les institutions publiques locales, comme les collèges ou les
            centres de loisirs.
          </p>
          <p className="project-tech">
            HTML, CSS, JavaScript, MapBox API, OpenStreetMap API, OpenWeatherMap
            API, GitHub
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

Project2Page.pageId = 2;
