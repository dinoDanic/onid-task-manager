import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getFavoriteStations } from "../../firebase/firebase.utils";

import RetroButton from "../retro/button/retro-button.component";

import "./favorite-stations.styles.scss";

const FavoriteStations = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [spaces, setSpaces] = useState([]);

  const { favoriteSpace } = currentUser;
  const favSpaces = getFavoriteStations(currentUser.favoriteSpace);

  useEffect(() => {
    favSpaces.then((spaces) => {
      setSpaces(spaces);
    });
  }, [currentUser]);

  return (
    <div className="favoriteStation">
      {spaces?.map((space) => {
        console.log(space);
        console.log(currentUser);
        return (
          <div className="fs__item" key={space.stationsId}>
            <Link to={`/s/${favoriteSpace}/e/${space.stationsId}/b`}>
              <RetroButton mode="flat">{space.name}</RetroButton>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default FavoriteStations;
