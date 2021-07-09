import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./favorite-star.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import {
  removeOneFavoriteStation,
  addOneFavoriteStation,
} from "../../redux/user/user.actions";

import {
  addStationFavorite,
  removeStationFavorite,
} from "../../firebase/firebase.utils";

const FavoriteStar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const stationId = useSelector((state) => state.history.stationId);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const { favoriteStations } = currentUser;

    if (!currentUser) return;

    console.log(favoriteStations);
    if (favoriteStations.includes(stationId)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [currentUser, stationId]);

  const removeStar = () => {
    try {
      removeStationFavorite(currentUser.uid, stationId);
    } finally {
      dispatch(removeOneFavoriteStation(stationId));
    }
  };
  const addStar = () => {
    try {
      addStationFavorite(currentUser.uid, stationId);
    } finally {
      dispatch(addOneFavoriteStation(stationId));
    }
  };

  return (
    <div className="favoriteStar">
      {isFavorite ? (
        <div className="fs__true fs__star" onClick={() => removeStar()}>
          <FontAwesomeIcon
            icon={faStar}
            size="2x"
            style={{
              color: "rgb(255 227 86)",
            }}
          />
        </div>
      ) : (
        <div className="fs__false fs__star" onClick={() => addStar()}>
          <FontAwesomeIcon icon={faStar} size="2x" />
        </div>
      )}
    </div>
  );
};

export default FavoriteStar;
