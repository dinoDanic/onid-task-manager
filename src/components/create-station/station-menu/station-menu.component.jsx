import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Views from "../../views/views.component";
import Modules from "../../modules/modules.component";
import StationInfo from "../../station-info/station-info.component";

import "./station-menu.styles.scss";

const StationMenu = () => {
  const stationData = useSelector((state) => state.space.stationData);
  const history = useHistory();
  const currentStationId = history.location.pathname.split("/")[4];
  const currentSpaceId = history.location.pathname.split("/")[2];
  const view = history.location.pathname.split("/")[5];
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!stationData) return;
    const data = stationData.filter(
      (item) => item.stationsId === currentStationId
    );
    setData(data[0]);
  }, [stationData, currentStationId]);

  return (
    <div className="stationMenu">
      <StationInfo
        data={data}
        currentStationId={currentStationId}
        currentSpaceId={currentSpaceId}
      />
      <div className="sm__buttomRow">
        <Views view={view} />
        <Modules />
      </div>
    </div>
  );
};

export default StationMenu;
