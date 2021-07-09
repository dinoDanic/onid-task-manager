import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import RetroButton from "../retro/button/retro-button.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "./favorite-stations.styles.scss";

const FavoriteStations = () => {
  const favoriteStations = useSelector(
    (state) => state.user.currentUser.favoriteStations
  );
  return (
    <div className="favoriteStation">
      {favoriteStations.length === 0 ? (
        <div className="fs__noStar">
          <FontAwesomeIcon icon={faStar} size="4x" />
          <p>No Stations Favorited</p>
        </div>
      ) : (
        <>
          {favoriteStations?.map((station) => {
            const { fromSpaceId, stationId } = station;
            return (
              <div className="fs__item" key={station.stationId}>
                <Link to={`/s/${fromSpaceId}/e/${stationId}/b`}>
                  <RetroButton mode="flat">{station.name}</RetroButton>
                </Link>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default FavoriteStations;
