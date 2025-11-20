import { PageProps } from "../types/PageTypes";
import { RollingText } from "../components/RollingText";

export const HomePage = ({ onNextPage, onContactPage }: PageProps) => {
  return (
    <div id="home-container">
      <h1 className="name-title-1">Rémi</h1>
      <div className="home-button-div">
        <button className="home-button" onClick={onNextPage}>
          <RollingText text="Portfolio" />
        </button>
        <button className="home-button contact-button" onClick={onContactPage}>
          <RollingText text="Contact" />
        </button>
      </div>
    </div>
  );
};

HomePage.pageId = 0;
