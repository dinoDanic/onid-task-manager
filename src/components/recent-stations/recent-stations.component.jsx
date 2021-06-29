import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import RetroButton from "../retro/button/retro-button.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./recent-stations.styles.scss";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

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
              <FontAwesomeIcon icon={faTasks} />
              {data.name}
            </RetroButton>
          );
        })
      )}
    </div>
  );
}

export default RecentStations;
