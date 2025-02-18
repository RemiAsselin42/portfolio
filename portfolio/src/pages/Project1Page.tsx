import { useState } from "react";
import { PageProps } from "../types/PageTypes";
import { ProjectModal } from "../components/ProjectModal";

export const Project1Page = ({ onNextPage }: PageProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="project-container" id="project-1">
      <h3 className="project-info">Présentation</h3>
      <div className="project-layout" id="project-1">
        <div
          className="project-image"
          id="project-1-image"
          onClick={() => setOpenModal(true)}
        >
          <section className="image-click">
            <p>Cliquez-ici !</p>
            <img src="/arrow.png" alt="arrow" />
          </section>
          <img
            src="/remi-pixel-art.png"
            alt="IMAGE"
            className="project-image image-presentation"
          />
        </div>
        <div className="project-text" id="project-1-text">
          <h2 className="project-title">Bonjour !</h2>
          <p className="project-description">
            <strong>Bienvenue</strong> sur mon portfolio ! Je m'appelle Rémi et
            je suis designer web et développeur web. J'adore imaginer, concevoir
            et coder des sites web et des applications. Je suis actuellement en
            bachelor Information Communication et Design Digital à Télécom
            Saint-Etienne et je suis à la recherche d'un master en web design
            pour septembre 2025.
            <br></br>
            Dans ce portfolio, vous trouverez plusieurs de mes créations
            digitales, qu'il s'agisse de projets personnels ou de projets
            scolaires, dans le web, le print ou encore en audiovisuel.
            <br></br>
            En parallèle de ma formation, j’ai créé mon auto-entreprise dans le
            domaine du web, ce qui m’a permis de travailler sur divers projets
            pour des associations dans le social, et d’acquérir des compétences
            en gestion entrepreneuriale.
            <br></br>Au travers de mon cursus et de mon activité, j’ai renforcé
            mes compétences en design et développement web en utilisant des
            outils et technologies variés&nbsp;: la Suite Adobe (Photoshop,
            Illustrator, InDesign, Adobe XD), Figma, HTML, SCSS, JS, React, PHP,
            SQL, Python, ainsi que GitHub. J’ai également acquis une expérience
            en création et montage vidéo (Premiere Pro), ainsi qu'en
            photographie.
          </p>

          <div className="project-button">
            <button className="next-button" onClick={onNextPage}>
              Découvrir mes projets
            </button>
          </div>
        </div>
      </div>

      {openModal && (
        <ProjectModal onClose={() => setOpenModal(false)}>
          <h2 className="modale-title">Détails du projet</h2>

          <p className="modale-description">
            Tout au long de ce portfolio vous pourrez cliquer sur les images de
            présentation des différents projets pour en savoir plus, et même
            tester certaines applications !
          </p>
          <hr></hr>
          <h2 className="modale-title">À propos de ce portfolio</h2>

          <p className="modale-description">
            J'ai réalisé ce site web entièrement par moi-même, en utilisant
            React (vite.js), le TypeScript, le SCSS, et le tout hébergé sur
            GitHub.
          </p>
          <section className="modale-section-logos">
            <img src="/react.png" alt="React" className="modale-logo" />
            <img src="/vite.png" alt="Vite" className="modale-logo" />
            <img
              src="/typescript.png"
              alt="TypeScript"
              className="modale-logo"
            />
            <img src="/css.png" alt="css" className="modale-logo" />
            <img src="/github.png" alt="GitHub" className="modale-logo" />
          </section>
          <section className="modale-section-rgpd">
            <p className="modale-description">
              Site réalisé par Rémi ASSELIN - {new Date().getFullYear()}
            </p>
          </section>
        </ProjectModal>
      )}
    </div>
  );
};

Project1Page.pageId = 1;
