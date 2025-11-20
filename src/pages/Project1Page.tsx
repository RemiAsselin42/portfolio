import { PageProps } from "../types/PageTypes";
import { ProjectTemplate } from "./ProjectTemplate";
import { LazyImage } from "../components/LazyImage";

export const Project1Page = (props: PageProps) => (
  <ProjectTemplate
    {...props}
    projectId={1}
    projectInfo="Présentation"
    projectImage={{
      src: "/remi-pixel-art.png",
      alt: "Portrait pixel art de Rémi",
    }}
    projectTitle="Bonjour&nbsp;!"
    projectDescription={
      <div>
        <strong>Bienvenue</strong> sur mon portfolio&nbsp;!
        <hr />
        Je suis Rémi, <strong>designer et développeur web</strong> à mon compte
        &nbsp;!
        <hr />
        Actuellement en{" "}
        <strong>
          bachelor Information Communication et Design Digital
        </strong> à <strong>Télécom Saint-Étienne</strong>, je recherche un
        <strong> master en web design</strong> pour septembre 2025.
        <hr />
        Découvrez ici mes <strong>projets web, print et audiovisuels</strong>,
        issus de travaux personnels et académiques.
        <hr />
        En parallèle, j'ai créé mon <strong>auto-entreprise</strong>,
        collaborant avec des <strong>associations du secteur social</strong>,
        développant ainsi mes compétences en
        <strong> gestion entrepreneuriale</strong>
        .
        <hr />
        J'utilise divers outils et technologies&nbsp;:&nbsp;
        <strong>Photoshop, Illustrator, InDesign, & Figma</strong> pour le
        design,{" "}
        <strong>HTML, SCSS, JS, React, PHP, SQL, Wordpress et GitHub </strong>
        pour mes projets web, et<strong> Premiere Pro </strong>
        pour le montage vidéo.
        <hr />
        Curieux d'en savoir plus&nbsp;? Cliquez sur <strong>+</strong> ou{" "}
        <strong>{">"}</strong> ou{" "}
        <button className="btn-contact-text" onClick={props.onContactPage}>
          <strong> contactez-moi </strong>
        </button>{" "}
        directement&nbsp;!
      </div>
    }
    projectTech="React.js, Vite.js, TypeScript, SASS, GitHub"
    modalContent={
      <div className="portfolio-modal-content">
        <h1>Mon Portfolio</h1>

        <section className="modal-section">
          <h2>Présentation du site</h2>
          <p>
            Ce portfolio est conçu comme une vitrine de mes compétences et
            réalisations en tant que designer et développeur web. J'ai voulu
            créer un portfolio plutôt atipique par sa forme, qui reflète ma
            personnalité et mon approche créative.
          </p>
          <p>
            Tout au long de ce portfolio, vous pourrez découvrir mes différents
            projets en détail, et même tester certaines applications que j'ai
            développées.
          </p>
          <p>
            Ces projets sont le fruit de mon parcours académique et
            professionnel, vous trouverez des réalisations personnelles, des
            projets de cours, des stages et mes réalisations en auto-entreprise.
          </p>
          <p>
            Vous pourrez naviguer à travers les différents projets en cliquant
            sur le + et cliquer sur le {">"} pour découvrir les détails de
            chaque réalisation.
          </p>
        </section>

        <section className="modal-section">
          <h2>Technologies utilisées</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <LazyImage src="/react.png" alt="React" className="tech-icon" />
              <span>React</span>
            </div>
            <div className="tech-item">
              <LazyImage src="/vite.png" alt="Vite" className="tech-icon" />
              <span>Vite</span>
            </div>
            <div className="tech-item">
              <LazyImage
                src="/typescript.png"
                alt="TypeScript"
                className="tech-icon"
              />
              <span>TypeScript</span>
            </div>
            <div className="tech-item">
              <LazyImage src="/sass.png" alt="SASS" className="tech-icon" />
              <span>SASS</span>
            </div>
            <div className="tech-item">
              <LazyImage src="/css.png" alt="CSS" className="tech-icon" />
              <span>CSS3</span>
            </div>
            <div className="tech-item">
              <LazyImage src="/github.png" alt="GitHub" className="tech-icon" />
              <span>GitHub</span>
            </div>
          </div>
        </section>

        {/* <section className="modal-section">
          <h2>Objectifs du portfolio</h2>
          <p>Ce portfolio a plusieurs objectifs :</p>
          <ul className="features-list">
            <li>
              <strong>Présenter mes compétences</strong> en design et
              développement web
            </li>
            <li>
              <strong>Démontrer ma maîtrise technique</strong> des technologies
              modernes du web
            </li>
            <li>
              <strong>Partager mes réalisations</strong> académiques et
              professionnelles
            </li>
            <li>
              <strong>Faciliter le contact</strong> pour d'éventuelles
              collaborations
            </li>
          </ul>
        </section>

        <section className="modal-section">
          <h2>Conclusion</h2>
          <p>
            Ce portfolio représente à la fois ma carte de visite professionnelle
            et un terrain d'expérimentation pour mes compétences techniques. Il
            évoluera au fil de mes projets et de mon parcours dans le domaine du
            design et du développement web.
          </p>
          <p>
            N'hésitez pas à explorer les différents projets présentés et à me
            contacter pour toute information complémentaire ou proposition de
            collaboration.
          </p>
          <p className="copyright">
            Site réalisé par Rémi ASSELIN - {new Date().getFullYear()}
          </p>
        </section> */}
      </div>
    }
  />
);

Project1Page.pageId = 1;
