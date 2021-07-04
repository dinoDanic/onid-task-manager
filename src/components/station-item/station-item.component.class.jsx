import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import RetroButton from "../retro/button/retro-button.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

import "./station-item.styles.scss";

function StationItem({ data }) {
  const activeSpaceId = useSelector((state) => state.history.spaceId);
  return (
    <div className="stationItem">
      <Link to={`/s/${activeSpaceId}/e/${data.stationsId}/b`}>
        <RetroButton>
          <FontAwesomeIcon icon={faTasks} size="2x" />
          {data.name}
        </RetroButton>
      </Link>
    </div>
  );
}

export default StationItem;
