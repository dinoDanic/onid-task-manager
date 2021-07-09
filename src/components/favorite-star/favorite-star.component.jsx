import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./favorite-star.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { signIn } from "../../redux/user/user.actions";

import {
  updateFavoriteStation,
  getTaskData,
} from "../../firebase/firebase.utils";

const FavoriteStar = () => {
  const user = useSelector((state) => state.user);
  const stationId = useSelector((state) => state.history.stationId);
  const spaceId = useSelector((state) => state.history.spaceId);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const { favoriteStations } = user.currentUser;
  const { currentUser } = user;

  useEffect(() => {
    console.log("trigger");

    if (!favoriteStations) return;
    const find = favoriteStations.filter(
      (item) => item.stationId === stationId
    );

    if (find.length === 0) {
      setIsFavorite(false);
      console.log("nofav");
      return;
    }

    const findStationId = find[0].stationId;
    if (findStationId === stationId) {
      setIsFavorite(true);
      console.log("fav");
    }
  }, [currentUser, stationId, dispatch, user]);

  const removeStar = () => {
    const user = currentUser;
    let stations = user.favoriteStations.filter(
      (item) => item.stationId !== stationId
    );
    user.favoriteStations = [...stations];
    console.log(user);
    updateFavoriteStation(currentUser.uid, user);
    dispatch(signIn(user));
  };

  const addStar = () => {
    const getData = getTaskData(spaceId, stationId);
    getData.then((data) => {
      const user = currentUser;
      user.favoriteStations.push(data);
      updateFavoriteStation(currentUser.uid, user);
      dispatch(signIn(user));
    });
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
