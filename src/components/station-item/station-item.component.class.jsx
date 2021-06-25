import React from "react";
import { Link, useHistory } from "react-router-dom";

import RetroButton from "../retro/button/retro-button.component";

import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";

import "./station.styles.scss";

function StationItem({ data }) {
  const history = useHistory();
  const activeSpaceId = history.location.pathname.split("/")[2];
  return (
    <div className="stationItem">
      <Link to={`/s/${activeSpaceId}/e/${data.stationsId}`}>
        <RetroButton>
          <AssignmentOutlinedIcon fontSize="small" />
          {data.name}
        </RetroButton>
      </Link>
    </div>
  );
}

export default StationItem;
