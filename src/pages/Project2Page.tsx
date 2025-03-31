import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";

export const Project2Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={2}
    projectInfo="Projet de cours&nbsp;:&nbsp;Workshop avec le département de la Loire"
    projectImage={{
      src: "/mockup-hirogo.png",
      alt: "Mockup de l'application HiroGo",
    }}
    projectTitle="HiroGo"
    projectDescription={
      <>
        <strong>HiroGo</strong> est une application que j'ai développé et en
        partie designé lors d'un Workshop de groupe en partenariat avec le
        département de la Loire. L'objectif de ce projet était de promouvoir les
        mobilités douces auprès des jeunes. Notre groupe a décidé de concevoir
        une application pour aider et accompagner les jeunes à faire du vélo.
        <br />
        Avec HiroGo, les utilisateurs peuvent :
        <ul>
          <li>
            <strong>Trouver des itinéraires sécurisés</strong>
          </li>
          <li>
            <strong>Consulter la météo</strong> pour planifier leurs trajets
          </li>
          <li>
            <strong>Découvrir des points d'intérêt</strong> tout au long de leur
            parcours
          </li>
        </ul>
        Pour encourager l'utilisation du vélo, HiroGo intègre un système de{" "}
        <strong>score</strong>, de <strong>quêtes quotidiennes</strong>, de{" "}
        <strong>récompenses</strong> et un <strong>classement</strong> pour
        motiver les jeunes à parcourir toujours plus de trajets.
        <br></br>
        Enfin, l'application propose une<strong> section Activités </strong>
        permettant aux jeunes de participer à des événements organisés par les
        institutions publiques locales, comme les collèges ou les centres de
        loisirs.
      </>
    }
    projectTech="HTML, CSS, JavaScript, MapBox API, OpenStreetMap API, OpenWeatherMap API, GitHub"
    modalContent={
      <div className="hirogo-modal-content">
        <h1>Projet HiroGo</h1>

        <section className="modal-section">
          <h2>Le Workshop</h2>
          <p>
            Ce projet a été réalisé dans le cadre d'un workshop intensif d'une
            semaines organisé par Télécom Saint-Étienne en collaboration avec le
            département de la Loire. L'objectif était de concevoir une solution
            numérique encourageant la mobilité douce auprès des jeunes du
            département.
          </p>
          <p>
            Notre équipe pluridisciplinaire était composée de 7 étudiants, dont
            5 étudiant en communication digitale, et 2 data-ingénieurs.
            Ensemble, nous avons imaginé le projet, réalisé une charte
            graphique, un logo, conçu toute la communication autour du projet,
            pensé l'application et développé un prototype fonctionnel, en 1
            semaine.
          </p>
          <p>
            J'ai moi-même été en charge du développement front-end de
            l'application, en utilisant les technologies HTML, CSS et
            JavaScript. J'ai du concevoir et développer l'application en
            seulement 3 jours.
          </p>
        </section>

        <section className="modal-section">
          <h2>Notre équipe</h2>
          <div className="team-images">
            <img
              src="/hirogo-presentation.jpg"
              alt="Présentation finale devant le jury"
            />
          </div>
        </section>

        <section className="modal-section">
          <h2>Fonctionnalités clés</h2>
          <ul className="features-list">
            <li>
              <strong>Itinéraires adaptés</strong>&nbsp;:&nbsp;Cartographie
              spécialement conçue pour privilégier les pistes cyclables, voies
              vertes et routes peu fréquentées
            </li>
            <li>
              <strong>Système de récompenses</strong>&nbsp;:&nbsp;Des points et
              badges sont attribués aux utilisateurs selon la distance parcourue
              et les défis relevés
            </li>
            <li>
              <strong>Quêtes journalières</strong>&nbsp;:&nbsp;Des missions
              quotidiennes motivent les jeunes à utiliser régulièrement
              l'application
            </li>
            <li>
              <strong>Météo intégrée</strong>&nbsp;:&nbsp;Prévisions précises
              pour planifier ses déplacements en connaissance de cause
            </li>
            <li>
              <strong>Points d'intérêt</strong>&nbsp;:&nbsp;Découverte de lieux
              remarquables, d'attractions et de commodités (fontaines,
              toilettes, etc.)
            </li>
            <li>
              <strong>Événements locaux</strong>&nbsp;:&nbsp;Agenda des
              activités organisées par les institutions locales accessibles à
              vélo
            </li>
          </ul>
        </section>

        {/* <section className="modal-section">
          <h2>Captures d'écran</h2>
          <div className="screenshots-grid">
            <img src="/hirogo-screen1.png" alt="Écran d'accueil HiroGo" />
            <img src="/hirogo-screen2.png" alt="Carte interactive HiroGo" />
            <img src="/hirogo-screen3.png" alt="Menu des quêtes HiroGo" />
            <img src="/hirogo-screen4.png" alt="Profil utilisateur HiroGo" />
          </div>
        </section> */}

        <section className="modal-section">
          <h2>Démonstration du projet</h2>
          <p>Testez l'application HiroGo directement ci-dessous :</p>
          <div className="iframe-container">
            <iframe
              src="https://remiasselin42.github.io/HiroGo/"
              title="HiroGo Application"
              className="hirogo-iframe"
              height="670"
              loading="lazy"
              allow="geolocation"
            />
          </div>
          <p className="iframe-note">
            Cette version est une démonstration avec des fonctionnalités
            limitées, les données sont statiques, hormis pour la météo et le
            calcul des itinéraires, qui se font grace aux API de MapBox,
            OpenStreetMap et OpenWeatherMap.
          </p>
        </section>

        <section className="modal-section">
          <h2>Technologies utilisées</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <img src="/html.webp" alt="HTML" />
              <span>HTML5</span>
            </div>
            <div className="tech-item">
              <img src="/css.png" alt="CSS" />
              <span>CSS3</span>
            </div>
            <div className="tech-item">
              <img src="/javascript.png" alt="JavaScript" />
              <span>JavaScript</span>
            </div>
            <div className="tech-item">
              <img src="/mapbox.png" alt="MapBox API" />
              <span>MapBox API</span>
            </div>
            <div className="tech-item">
              <img src="/openweather.png" alt="OpenWeather API" />
              <span>OpenWeather API</span>
            </div>
            <div className="tech-item">
              <img src="/openstreetmap.png" alt="OpenStreetMap API" />
              <span>OpenStreetMap API</span>
            </div>
            <div className="tech-item">
              <img src="/github.png" alt="GitHub" />
              <span>GitHub</span>
            </div>
          </div>
        </section>

        <section className="modal-section">
          <h2>Conclusion</h2>
          <p>
            Ce projet a été un véritable défi créatif et technique qui nous a
            permis d'explorer les problématiques de mobilité durable tout en
            développant une solution concrète et ludique. Notre application
            HiroGo a été très bien reçue par le jury composé de représentants du
            département de la Loire et de professionnels du numérique, puisque
            nous avons terminé premier du podium.
          </p>
          <p>
            Au-delà de l'aspect technique, cette expérience m'a permis de
            développer des compétences en gestion de projet, en collaboration
            pluridisciplinaire et en présentation devant un public
            professionnel.
          </p>
        </section>
      </div>
    }
  />
);

Project2Page.pageId = 2;
