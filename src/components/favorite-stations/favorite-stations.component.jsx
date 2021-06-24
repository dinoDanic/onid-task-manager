import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getFavoriteStations } from "../../firebase/firebase.utils";

import RetroButton from "../retro/button/retro-button.component";

import "./favorite-stations.styles.scss";

const FavoriteStations = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [spaces, setSpaces] = useState([]);

  const favSpaces = getFavoriteStations(currentUser.favoriteSpace);

  useEffect(() => {
    favSpaces.then((spaces) => {
      setSpaces(spaces);
    });
  }, [currentUser]);

  return (
    <div>
      {spaces?.map((space) => {
        return (
          <RetroButton key={space.stationsId} mode="flat">
            {space.name}
          </RetroButton>
        );
      })}
    </div>
  );
};

export default FavoriteStations;
