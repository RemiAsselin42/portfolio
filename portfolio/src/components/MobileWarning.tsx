import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen, faRotate } from "@fortawesome/free-solid-svg-icons";

interface MobileWarningProps {
  onContinueAnyway: () => void;
}

export const MobileWarning: React.FC<MobileWarningProps> = ({
  onContinueAnyway,
}) => {
  return (
    <div className="mobile-warning">
      <h1 className="mobile-warning__title">Version mobile indisponible</h1>
      <p className="mobile-warning__message">
        Ce portfolio n'est pas encore optimisé pour les appareils mobiles. Pour
        une expérience optimale, veuillez utiliser un ordinateur.
      </p>

      <div className="mobile-warning__image">
        <FontAwesomeIcon
          icon={faMobileScreen}
          size="6x"
          style={{
            opacity: 0.6,
            position: "relative",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "150px",
            height: "5px",
            backgroundColor: "#f77851",
            transform: "rotate(-45deg)",
            marginTop: "-80px",
          }}
        ></div>
      </div>

      <p className="mobile-warning__message">
        Vous pouvez passer en mode paysage pour tenter d'afficher le site, mais
        l'expérience ne sera pas optimale.
      </p>

      <button className="mobile-warning__button" onClick={onContinueAnyway}>
        Continuer quand même
        <span className="rotate-icon">
          <FontAwesomeIcon icon={faRotate} />
        </span>
      </button>
    </div>
  );
};
