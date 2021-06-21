import React from "react";

import RetroButton from "../retro/button/retro-button.component";

import BlurOnOutlinedIcon from "@material-ui/icons/BlurOnOutlined";

import "./station.styles.scss";

function StationItem({ data }) {
  return (
    <div className="stationItem">
      <RetroButton>
        <BlurOnOutlinedIcon fontSize="small" />
        {data.name}
      </RetroButton>
    </div>
  );
}

export default StationItem;
