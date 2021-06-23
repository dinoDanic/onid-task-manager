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
          return (
            <Link key={data.spaceId} to={`/s/${data.spaceId}`}>
              <div className="sd__btn">
                <RetroButton
                  style={{ background: data.color }}
                  key={data.stationsId}
                >
                  {data.name.charAt(0)}
                </RetroButton>
                <h4>{data.name}</h4>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="sd__something">
        <p> idea?</p>
      </div>
    </div>
  );
}

export default SpaceData;
