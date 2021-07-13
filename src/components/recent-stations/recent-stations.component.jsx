import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import RetroButton from "../retro/button/retro-button.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./recent-stations.styles.scss";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

function RecentStations({ activeSpaceData }) {
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
        <>
          <p>U have no Stations!</p>
        </>
      ) : (
        recentStation?.map((data) => {
          return (
            <div className="rs__item" key={data.stationId}>
              <Link to={`/s/${activeSpaceData.spaceId}/e/${data.stationId}/b`}>
                <RetroButton mode="flat">
                  <FontAwesomeIcon icon={faTasks} size="2x" />
                  {data.name}
                </RetroButton>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}

export default RecentStations;
