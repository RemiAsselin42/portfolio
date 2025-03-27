import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";

export const Project6Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={6}
    projectInfo="Projet de cours : Application web dynamique en PHP"
    projectImage={{
      src: "/hyxe.png",
      alt: "Mockup Hyxe - Clone de Twitter",
    }}
    projectTitle="Hyxe"
    projectDescription={
      <>
        <strong>Hyxe</strong> est un projet de cours réalisé en duo, centré sur
        l'apprentissage du PHP et la création d'applications dynamiques. Il
        s'agit d'une réplique simplifiée de Twitter avec :
        <br />• <strong>Publication de messages</strong> similaires aux tweets.
        <br />• <strong>Système de réponses</strong> permettant d'interagir avec
        les publications d'autres utilisateurs.
        <br />• <strong>Fonctionnalité de likes</strong> pour les publications
        (en cours de développement).
        <br />• <strong>Système d'inscription et connexion</strong> pour gérer
        les utilisateurs (en cours de développement).
        <br />
        Ce projet nous a permis d'appliquer nos connaissances en PHP en créant
        une application web entièrement fonctionnelle avec gestion de base de
        données.
      </>
    }
    projectTech="PHP, CSS, SQL, MySQL, HTML, Git"
    modalContent={
      <div className="hyxe-modal-content">
        <h1>Projet Hyxe</h1>

        <section className="modal-section">
          <h2>Présentation du projet</h2>
          <p>
            Hyxe est un projet pédagogique réalisé dans le cadre de mes études, axé 
            sur le développement d'applications web dynamiques en PHP et la gestion de bases 
            de données SQL. 
          </p>
          <p>
            L'objectif principal était d'appliquer nos connaissances théoriques pour créer 
            une application web fonctionnelle qui intègre plusieurs mécaniques clés des 
            réseaux sociaux modernes. Nous avons choisi de nous inspirer de Twitter pour 
            sa structure relativement simple mais puissante.
          </p>
        </section>

        <section className="modal-section">
          <h2>Fonctionnalités développées</h2>
          <ul className="features-list">
            <li>
              <strong>Système de publications</strong> : Les utilisateurs peuvent créer des messages 
              courts (équivalents aux tweets) avec une limitation de caractères
            </li>
            <li>
              <strong>Réponses et commentaires</strong> : Possibilité d'interagir avec les 
              publications d'autres utilisateurs en y répondant
            </li>
            <li>
              <strong>Interface utilisateur</strong> : Design responsive inspiré de l'interface 
              Twitter avec un focus sur la lisibilité et l'UX
            </li>
            <li>
              <strong>Système de likes</strong> : Fonctionnalité permettant d'apprécier les 
              publications (partiellement implémentée)
            </li>
            <li>
              <strong>Authentification</strong> : Système d'inscription et de connexion pour 
              gérer les utilisateurs (en phase de développement)
            </li>
          </ul>
        </section>

        <section className="modal-section">
          <h2>Aspect technique</h2>
          <p>
            Ce projet nous a permis d'explorer plusieurs facettes du développement web :
          </p>
          <ul className="features-list">
            <li>
              <strong>Architecture MVC</strong> : Organisation du code selon le modèle 
              Modèle-Vue-Contrôleur pour une meilleure maintenabilité
            </li>
            <li>
              <strong>Base de données relationnelle</strong> : Conception d'un schéma SQL optimisé 
              pour les relations entre utilisateurs, publications et interactions
            </li>
            <li>
              <strong>Sessions PHP</strong> : Gestion des sessions utilisateur pour l'authentification 
              et la personnalisation de l'expérience
            </li>
            <li>
              <strong>Requêtes préparées</strong> : Protection contre les injections SQL et 
              sécurisation des interactions avec la base de données
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
              <img src="/css.png" alt="CSS" />
              <span>CSS</span>
            </div>
            <div className="tech-item">
              <img src="/github.png" alt="GitHub" />
              <span>Git</span>
            </div>
            <div className="tech-item">
              <img src="/mysql.png" alt="MySQL" />
              <span>MySQL</span>
            </div>
            <div className="tech-item">
              <img src="/wamp.png" alt="WAMP" />
              <span>WAMP</span>
            </div>
          </div>
        </section>

        <section className="modal-section">
          <h2>Processus de développement</h2>
          <p>
            Le développement de Hyxe s'est déroulé en plusieurs phases :
          </p>
          <ul className="features-list">
            <li>
              <strong>Conception</strong> : Définition des fonctionnalités et du schéma de base de données
            </li>
            <li>
              <strong>Création de la structure</strong> : Mise en place de l'architecture MVC et des fichiers de base
            </li>
            <li>
              <strong>Développement du back-end</strong> : Programmation des fonctionnalités principales en PHP
            </li>
            <li>
              <strong>Intégration front-end</strong> : Design et implémentation de l'interface utilisateur
            </li>
            <li>
              <strong>Tests et optimisation</strong> : Correction des bugs et amélioration des performances
            </li>
          </ul>
        </section>

        <section className="modal-section">
          <h2>Conclusion</h2>
          <p>
            Ce projet a été une excellente opportunité d'appliquer mes connaissances en PHP 
            et SQL à un cas concret et intéressant. Bien que certaines fonctionnalités restent 
            à finaliser, cette expérience m'a permis de mieux comprendre les défis liés 
            au développement d'applications web dynamiques et à la gestion de bases de données relationnelles.
          </p>
          <p>
            J'ai particulièrement apprécié le travail en binôme qui a permis d'échanger des idées, 
            de résoudre des problèmes ensemble et d'apprendre de nouvelles techniques de développement.
          </p>
        </section>
      </div>
    }
  />
);

Project6Page.pageId = 6;