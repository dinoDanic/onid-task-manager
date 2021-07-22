import React from "react";
import { useSelector } from "react-redux";

import RetroButton from "../../retro/button/retro-button.component";

const Icon = ({ space }) => {
  const spaceId = useSelector((state) => state.history.spaceId);
  const buttonStyle = {
    background: `${space.color}`,
    /*    filter: space.spaceId === spaceId ? "" : "grayscale(50%)", */
    transform: space.spaceId === spaceId ? "scale(1.1)" : "scale(0.85)",
  };
  return (
    <div className="icon">
      {spaceId ? (
        <div className="icon__button-active">
          <RetroButton style={buttonStyle} charAt size="box">
            {space.name}
          </RetroButton>
        </div>
      ) : (
        <div className="icon__button-null">
          <RetroButton
            style={{ background: `${space.color}` }}
            charAt
            size="box"
          >
            {space.name}
          </RetroButton>
        </div>
      )}
    </div>
  );
};

export default Icon;
