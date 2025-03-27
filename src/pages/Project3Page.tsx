import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";

export const Project3Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={3}
    projectInfo="Projet de cours autour du PHP et des bases de données"
    projectImage={{
      src: "/la-grimpette.png",
      alt: "Mockup La Grimpette",
    }}
    projectTitle="La Grimpette"
    projectDescription={
      <>
        <strong>La Grimpette</strong> est un projet de cours autour du PHP et du
        SQL. Il s'agit du site d'un club d'escalade fictif. Ce projet comprend
        deux volets essentiels :
        <br />• <strong>Un site front</strong> qui présente le club, ses
        activités et événements avec la posibilité de s'y inscrire.
        <br />• <strong>Un site backoffice</strong> dédié à la gestion des
        inscriptions et des activités. On peut par exemple y ajouter des
        activités, les modifier, les supprimer, valdier les inscriptions, les
        refuser, et voir les activités et inscriptions passées.
        <br />
        Le design du site a été fait au préalable sur Figma.
      </>
    }
    projectTech="Figma, JavaScript, SCSS, React (Vite), JSON, PHP, SQL, WAMP, GitHub"
    modalContent={
      <div className="la-grimpette-modal-content">
        <h1>Projet La Grimpette</h1>

        <section className="modal-section">
          <h2>Présentation du projet</h2>
          <p>
            La Grimpette est un projet de cours réalisé dans le cadre de mon Bachelor, 
            axé sur le développement web avec PHP et les bases de données SQL. L'objectif 
            était de créer un site web complet pour un club d'escalade fictif, avec une 
            partie publique et une interface d'administration.
          </p>
          <p>
            Ce projet m'a permis d'approfondir mes connaissances en développement 
            back-end, gestion de base de données, et création d'interfaces administratives 
            sécurisées.
          </p>
        </section>

        <section className="modal-section">
          <h2>Fonctionnalités principales</h2>
          <ul className="features-list">
            <li>
              <strong>Présentation du club</strong> : Page d'accueil avec les informations 
              essentielles sur le club d'escalade
            </li>
            <li>
              <strong>Catalogue des activités</strong> : Liste des cours, séances et 
              événements proposés par le club
            </li>
            <li>
              <strong>Système d'inscription</strong> : Formulaire permettant aux utilisateurs 
              de s'inscrire aux activités
            </li>
            <li>
              <strong>Espace membre</strong> : Zone privée pour consulter ses inscriptions
            </li>
            <li>
              <strong>Interface d'administration</strong> : Backoffice complet pour gérer 
              les activités, les membres et les inscriptions
            </li>
            <li>
              <strong>Validations et alertes</strong> : Système de notification pour 
              confirmer ou refuser les inscriptions
            </li>
          </ul>
        </section>

        <section className="modal-section">
          <h2>Aspect technique</h2>
          <p>
            Le développement de ce projet a nécessité la mise en œuvre de plusieurs 
            technologies et pratiques de développement web :
          </p>
          <ul className="features-list">
            <li>
              <strong>Architecture MVC</strong> : Organisation du code selon le modèle 
              Modèle-Vue-Contrôleur
            </li>
            <li>
              <strong>Base de données relationnelle</strong> : Conception et implémentation 
              d'un schéma SQL optimisé
            </li>
            <li>
              <strong>Sécurité web</strong> : Protection contre les injections SQL, 
              validation des formulaires, gestion des sessions
            </li>
            <li>
              <strong>Interface responsive</strong> : Design adaptatif pour différentes 
              tailles d'écran
            </li>
          </ul>
        </section>

        <section className="modal-section">
          <h2>Technologies utilisées</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <img src="/php.png" alt="PHP" />
              <span>PHP</span>
            </div>
            <div className="tech-item">
              <img src="/sql.png" alt="SQL" />
              <span>SQL</span>
            </div>
            <div className="tech-item">
              <img src="/react.png" alt="React" />
              <span>React</span>
            </div>
            <div className="tech-item">
              <img src="/sass.png" alt="SASS" />
              <span>SASS</span>
            </div>
            <div className="tech-item">
              <img src="/javascript.png" alt="JavaScript" />
              <span>JavaScript</span>
            </div>
            <div className="tech-item">
              <img src="/json.png" alt="JSON" />
              <span>JSON</span>
            </div>
            <div className="tech-item">
              <img src="/wamp.png" alt="WAMP" />
              <span>WAMP</span>
            </div>
            <div className="tech-item">
              <img src="/github.png" alt="GitHub" />
              <span>GitHub</span>
            </div>
            <div className="tech-item">
              <img src="/figma.svg" alt="Figma" />
              <span>Figma</span>
            </div>
          </div>
        </section>

        <section className="modal-section">
          <h2>Conclusion</h2>
          <p>
            Ce projet m'a permis de développer des compétences pratiques en développement 
            full-stack, en combinant à la fois les aspects front-end et back-end. La gestion 
            des bases de données et la création d'une interface d'administration sécurisée 
            ont été particulièrement enrichissantes.
          </p>
          <p>
            J'ai également appris à structurer un projet web complet, de la conception 
            initiale jusqu'à l'implémentation des fonctionnalités avancées, en appliquant 
            les bonnes pratiques de développement.
          </p>
        </section>
      </div>
    }
  />
);

Project3Page.pageId = 3;
