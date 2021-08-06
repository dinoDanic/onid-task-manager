import React, { useEffect, useState } from "react";
import { db, updateUser } from "../../firebase/firebase.utils";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import RetroButton from "../retro/button/retro-button.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "./favorite-stations.styles.scss";

const FavoriteStations = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [favoriteStations, setFavoriteStations] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const { favoriteStations } = currentUser;
    db.collection("users")
      .doc(currentUser.uid)
      .onSnapshot((userData) => {
        const user = userData.data();
        if (userData.exists) {
          setFavoriteStations(user.favoriteStations);
        }
      });
    // but dose it exists ?
    favoriteStations?.map((station) => {
      db.collection("space")
        .doc(station.fromSpaceId)
        .collection("stations")
        .doc(station.stationId)
        .get()
        .then((stationData) => {
          if (stationData.exists) {
            console.log("well it exists, no code (write somethign)");
          } else {
            console.log(
              "it dose not exist, need to delete from favorite",
              station.stationId
            );
            db.collection("users")
              .doc(currentUser.uid)
              .get()
              .then((userData) => {
                let user = userData.data();
                user.favoriteStations = user.favoriteStations.filter(
                  (st) => st.stationId !== station.stationId
                );
                updateUser(currentUser.uid, user);
              });
          }
        });
    });
  }, [currentUser]);
  return (
    <div className="favoriteStation">
      {favoriteStations?.length === 0 ? (
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
                  <RetroButton mode="flat">
                    <FontAwesomeIcon icon={faStar} /> {station.name}
                  </RetroButton>
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
