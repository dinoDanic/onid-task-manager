import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./favorite-star.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { updateUser } from "../../firebase/firebase.utils";

const FavoriteStar = ({ data }) => {
  const user = useSelector((state) => state.user);
  const stationId = useSelector((state) => state.history.stationId);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const { favoriteStations } = user.currentUser;
  const { currentUser } = user;

  useEffect(() => {
    if (!favoriteStations) return;
    const find = favoriteStations.filter(
      (item) => item.stationId === stationId
    );

    if (find.length === 0) {
      setIsFavorite(false);
      return;
    }
    const findStationId = find[0].stationId;
    if (findStationId === stationId) {
      setIsFavorite(true);
    }
  }, [currentUser, stationId, dispatch, user]);

  const removeStar = () => {
    currentUser.favoriteStations = currentUser.favoriteStations.filter(
      (item) => item.stationId !== stationId
    );
    updateUser(currentUser.uid, currentUser);
  };

  const addStar = () => {
    currentUser.favoriteStations.push(data);

    updateUser(currentUser.uid, currentUser);
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
