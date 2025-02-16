import { PageProps } from "../types/PageTypes";

export const HomePage = ({ onNextPage, onContactPage }: PageProps) => {
  return (
    <div id="home-container">
      <h1 className="name-title-1">Rémi</h1>
      <div className="home-button-div">
        <button className="home-button" onClick={onNextPage}>
          Portfolio
        </button>
        <button className="home-button contact-button" onClick={onContactPage}>
          Contact
        </button>
      </div>
    </div>
  );
};

HomePage.pageId = 0;
