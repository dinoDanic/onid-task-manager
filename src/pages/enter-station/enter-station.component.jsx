import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { db } from "../../firebase/firebase.utils";

import Board from "../board/board.component";

import "./enter-station.stayles.scss";

const EnterStation = () => {
  const history = useHistory();
  const currentSpaceId = history.location.pathname.split("/")[2];
  const currentStationId = history.location.pathname.split("/")[4];

  const [station, setStation] = useState([]);
  useEffect(() => {
    db.collection("space")
      .doc(currentSpaceId)
      .collection("stations")
      .doc(currentStationId)
      .onSnapshot((stationData) => {
        setStation(stationData.data());
      });
  }, [currentSpaceId, currentStationId]);

  return (
    <>
      <Route
        exact
        path="/s/:id/e/:id/b"
        render={() => <Board station={station} />}
      />
    </>
  );
};

export default EnterStation;
