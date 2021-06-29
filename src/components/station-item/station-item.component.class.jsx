import React from "react";
import { Link, useHistory } from "react-router-dom";

import RetroButton from "../retro/button/retro-button.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

import "./station.styles.scss";

function StationItem({ data }) {
  const history = useHistory();
  const activeSpaceId = history.location.pathname.split("/")[2];
  return (
    <div className="stationItem">
      <Link to={`/s/${activeSpaceId}/e/${data.stationsId}`}>
        <RetroButton>
          <FontAwesomeIcon icon={faTasks} />
          {data.name}
        </RetroButton>
      </Link>
    </div>
  );
}

export default StationItem;
