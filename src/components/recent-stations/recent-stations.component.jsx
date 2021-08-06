import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import RetroButton from "../retro/button/retro-button.component";
import CreateStation from "../create-station/create-station.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faPlusSquare } from "@fortawesome/free-solid-svg-icons";

import "./recent-stations.styles.scss";

function RecentStations({ activeSpaceData }) {
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationData = useSelector((state) => state.space.stationData);
  const [recentStation, setRecentStation] = useState(null);
  const [createStation, setCreateStation] = useState(false);

  useEffect(() => {
    if (stationData) {
      setRecentStation(stationData.slice(-3));
    }
  }, [stationData]);

  return (
    <div className="recentStations">
      {stationData?.length < 1 ? (
        <div className="recentStations__noStations">
          <div className="recentStations__msg">
            <p>U have no Stations!</p>
          </div>
          <div className="recentStations__noBtn">
            <RetroButton color="info" onClick={() => setCreateStation(true)}>
              Cretate your first Station
            </RetroButton>
          </div>
        </div>
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
      <div className="recentStations__create">
        <RetroButton mode="create" onClick={() => setCreateStation(true)}>
          <FontAwesomeIcon icon={faPlusSquare} />
          Create new Station
        </RetroButton>
      </div>
      {createStation && (
        <CreateStation
          setCreateStation={setCreateStation}
          activeSpaceId={spaceId}
        />
      )}
    </div>
  );
}

export default RecentStations;
