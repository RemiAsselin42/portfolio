import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";
import { LazyImageComponent } from "../components";

export const Project5Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={5}
    projectInfo="Stage professionnel&nbsp;:&nbsp;Web Design & Développement Front-end"
    projectImage={{
      src: "/geopostcodes.webp",
      alt: "Stage chez GeoPostcodes",
    }}
    projectTitle="GeoPostcodes"
    projectDescription={
      <>
        Pendant mon <strong>stage chez GeoPostcodes</strong>, j'ai occupé un
        double rôle de web designer et développeur front-end, tout en
        participant à l'amélioration du SEO. Mes missions comprenaient&nbsp;:
        <br />• <strong>Webdesign et optimisation</strong> - Création et
        modification de pages web sur WordPress avec Elementor, amélioration du
        référencement (SEO), optimisation des performances du site web, et
        conception UX/UI.
        <br />• <strong>Développement frontend</strong> - Développement de pages
        en React.js (TypeScript), création d'une carte interactive avec MapBox
        (de la conception Figma jusqu'au développement).
        <br />• <strong>Outils spécialisés</strong> - Mise en place d'un "Zip
        Code Looker" permettant la recherche efficace de données géographiques
        dans la base de données de l'entreprise.
        <br />
        Ce stage m'a permis de mettre en pratique des compétences variées et de
        contribuer à l'amélioration d'un service utilisé à l'échelle
        internationale.
      </>
    }
    projectTech="WordPress, Elementor, React.js, TypeScript, Figma, MapBox, HTML, CSS, SEO"
    modalContent={
      <div className="geopostcodes-modal-content">
        <h1>Stage chez GeoPostcodes</h1>

        <section className="modal-section">
          <h2>Présentation de l'entreprise</h2>
          <p>
            GeoPostcodes est une entreprise spécialisée dans les données
            géographiques et postales à l'échelle internationale. Elle fournit
            des bases de données précises et à jour concernant les codes
            postaux, divisions administratives et informations géographiques
            pour 247 pays et territoires.
          </p>
          <p>
            La plateforme web de GeoPostcodes permet aux entreprises et aux
            organisations d'accéder à ces données et de les utiliser pour
            améliorer leur logistique, leur analyse de marché et leurs
            stratégies de marketing géolocalisé.
          </p>
        </section>

        <section className="modal-section">
          <h2>Missions principales</h2>
          <ul className="features-list">
            <li>
              <strong>Refonte de pages existantes</strong>
              &nbsp;:&nbsp;Amélioration du design et de l'expérience utilisateur
              des pages principales du site avec WordPress et Elementor
            </li>
            <li>
              <strong>Optimisation SEO</strong>&nbsp;:&nbsp;Analyse et
              amélioration du référencement naturel et optimisation des
              performances du site
            </li>
            <li>
              <strong>Développement d'une carte interactive</strong>
              &nbsp;:&nbsp;Création d'une application cartographique permettant
              la visualisation des données postales
            </li>
            <li>
              <strong>Outil de recherche avancée</strong>
              &nbsp;:&nbsp;Développement d'un "Zip Code Looker" pour faciliter
              l'accès aux données de l'entreprise
            </li>
          </ul>
        </section>

        <section className="modal-section">
          <h2>Développement et compétences acquises</h2>
          <p>
            Ce stage m'a permis de développer des compétences variées, allant de
            la gestion de CMS comme WordPress à l'utilisation de frameworks
            modernes comme React.js. J'ai également approfondi mes connaissances
            en SEO et en UX/UI design.
          </p>
          <p>
            La création de l'application cartographique avec MapBox a été
            particulièrement enrichissante, car elle m'a permis de combiner mes
            compétences en design (Figma) et en développement (React,
            TypeScript) pour créer un outil interactif et intuitif.
          </p>
        </section>

        <section className="modal-section">
          <h2>Technologies utilisées</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <LazyImageComponent
                src="/wordpress.webp"
                alt="WordPress"
                className="tech-icon"
                sizes="60px"
              />
              <span>WordPress</span>
            </div>
            <div className="tech-item">
              <LazyImageComponent
                src="/elementor.webp"
                alt="Elementor"
                className="tech-icon"
                sizes="60px"
              />
              <span>Elementor</span>
            </div>
            <div className="tech-item">
              <LazyImageComponent
                src="/react.webp"
                alt="React"
                className="tech-icon"
                sizes="60px"
              />
              <span>React.js</span>
            </div>
            <div className="tech-item">
              <LazyImageComponent
                src="/vite.webp"
                alt="vite"
                className="tech-icon"
                sizes="60px"
              />
              <span>Vite.js</span>
            </div>
            <div className="tech-item">
              <LazyImageComponent
                src="/typescript.webp"
                alt="TypeScript"
                className="tech-icon"
                sizes="60px"
              />
              <span>TypeScript</span>
            </div>
            <div className="tech-item">
              <LazyImageComponent
                src="/sass.webp"
                alt="sass"
                className="tech-icon"
                sizes="60px"
              />
              <span>SCSS</span>
            </div>
            <div className="tech-item">
              <LazyImageComponent
                src="/mapbox.webp"
                alt="MapBox"
                className="tech-icon"
                sizes="60px"
              />
              <span>MapBox</span>
            </div>
            <div className="tech-item">
              <LazyImageComponent
                src="/figma.webp"
                alt="Figma"
                className="tech-icon"
                sizes="60px"
              />
              <span>Figma</span>
            </div>
            <div className="tech-item">
              <LazyImageComponent
                src="/hubspot.webp"
                alt="hubspot"
                className="tech-icon"
                sizes="60px"
              />
              <span>HubSpot</span>
            </div>
          </div>
        </section>

        <section className="modal-section" id="iframe-geopostcodes">
          <h2>Réalisations</h2>
          <p>
            Voici la carte intéractive réalisée lors de ce stage en react.js via
            l'API de MapBox&nbsp;:
          </p>
          <div className="iframe-container">
            <iframe
              src="https://iframes.geopostcodes.com/map-explorer"
              title="GeoPostcodes Map Explorer"
              className="geopostcodes-iframe"
              loading="lazy"
              allow="geolocation"
            />
          </div>
          <p className="iframe-note">
            L'objectif était de montrer visuellement les données qu'à
            l'entreprise sur les États-Unis, tout en montant aussi qu'elle
            dispose des autres données du monde entier, et ce, en redirigeant
            vers le site de GeoPostcodes.
          </p>
        </section>

        <section className="modal-section">
          <h2>Conclusion</h2>
          <p>
            Ce stage m'a permis de développer mes compétences techniques et de
            comprendre comment elles s'intègrent dans un environnement
            professionnel réel. J'ai également eu l'opportunité de travailler
            dans un contexte international, GeoPostcodes servant des clients
            dans le monde entier, et donc d'améliorer mon anglais, à l'écris et
            à l'oral.
          </p>
        </section>
      </div>
    }
  />
);

Project5Page.pageId = 5;
