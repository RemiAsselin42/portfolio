import React from "react";
import "./RollingText.scss";

interface RollingTextProps {
  text: string;
}

export const RollingText: React.FC<RollingTextProps> = ({ text }) => {
  return (
    <span className="rolling-text">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="letter-wrapper"
          style={
            {
              "--delay": `${(index * 0.025).toFixed(3)}s`,
            } as React.CSSProperties
          }
        >
          <span className="letter original">{char}</span>
          <span className="letter duplicate">{char}</span>
        </span>
      ))}
    </span>
  );
};
