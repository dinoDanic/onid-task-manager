import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import RetroButton from "../retro/button/retro-button.component";

import "./space-data.styles.scss";

function SpaceData() {
  const spaceData = useSelector((state) => state.space.spaceData);

  return (
    <div className="spaceData">
      <div className="sd__data">
        {spaceData.map((data) => {
          const { spaceId, color, name } = data;
          return (
            <div key={spaceId} className="sd__btn">
              <Link to={`/s/${data.spaceId}`}>
                <div className="sd__btnClick">
                  <RetroButton style={{ background: color }}>
                    {name.charAt(0)}
                  </RetroButton>
                  <h4>{name}</h4>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SpaceData;
