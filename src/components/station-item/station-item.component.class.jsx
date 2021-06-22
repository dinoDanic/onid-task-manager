import React from "react";

import RetroButton from "../retro/button/retro-button.component";

import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";

import "./station.styles.scss";

function StationItem({ data }) {
  return (
    <div className="stationItem">
      <RetroButton>
        <AssignmentOutlinedIcon fontSize="small" />
        {data.name}
      </RetroButton>
    </div>
  );
}

export default StationItem;
