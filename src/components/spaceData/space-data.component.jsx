import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import RetroButton from "../retro/button/retro-button.component";
import CreateSpace from "../create-space/create-space.component";

import "./space-data.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

function SpaceData() {
  const spaceData = useSelector((state) => state.space.spaceData);
  const [create, setCreate] = useState(false);

  return (
    <div className="spaceData">
      <div className="sd__data">
        {spaceData.map((data) => {
          const { spaceId, color, name } = data;
          return (
            <Link to={`/s/${data.spaceId}`}>
              <div key={spaceId} className="sd__btn">
                <div className="sd__btnClick">
                  <RetroButton style={{ background: color }}>
                    {name.charAt(0)}
                  </RetroButton>
                  <h4>{name}</h4>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="sd__createNewSpace">
        <RetroButton mode="create" onClick={() => setCreate(!create)}>
          <FontAwesomeIcon icon={faPlusSquare} /> Create new Space
        </RetroButton>
      </div>
      {create && <CreateSpace setLayer={setCreate} />}
    </div>
  );
}

export default SpaceData;
