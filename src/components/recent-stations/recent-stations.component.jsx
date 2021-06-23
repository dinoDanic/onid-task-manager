import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import RetroButton from "../retro/button/retro-button.component";

import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";

import "./recent-stations.styles.scss";

function RecentStations() {
  const [recentStation, setRecentStation] = useState(null);
  const stationData = useSelector((state) => state.space.stationData);

  useEffect(() => {
    if (stationData) {
      setRecentStation(stationData.slice(-3));
    }
  }, [stationData]);

  return (
    <div className="recentStations">
      {stationData?.length < 1 ? (
        <p>U have no Stations!</p>
      ) : (
        recentStation?.map((data) => {
          return (
            <RetroButton mode="flat" key={data.stationsId}>
              <AssignmentOutlinedIcon fontSize="small" />
              {data.name}
            </RetroButton>
          );
        })
      )}
    </div>
  );
}

export default RecentStations;
