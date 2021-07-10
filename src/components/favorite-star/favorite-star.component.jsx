import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./favorite-star.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import {
  removeStarFavorite,
  addStarFavorite,
} from "../../firebase/firebase.utils";
import { setCurrentUser } from "../../redux/user/user.actions";

const FavoriteStar = () => {
  const user = useSelector((state) => state.user);
  const stationId = useSelector((state) => state.history.stationId);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const { favoriteStations } = user.currentUser;
  const { currentUser } = user;

  useEffect(() => {
    if (!favoriteStations) return;
    const find = favoriteStations.filter((item) => item === stationId);
    if (find.length === 0) {
      setIsFavorite(false);
      return;
    }
    const findStationId = find[0];
    if (findStationId === stationId) {
      setIsFavorite(true);
    }
  }, [currentUser, stationId, dispatch, user]);

  const removeStar = () => {
    currentUser.favoriteStations = currentUser.favoriteStations.filter(
      (item) => item !== stationId
    );
    dispatch(setCurrentUser(currentUser));
    removeStarFavorite(currentUser.uid, stationId);
  };

  const addStar = () => {
    currentUser.favoriteStations.push(stationId);
    dispatch(setCurrentUser(currentUser));
    addStarFavorite(currentUser.uid, stationId);
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
