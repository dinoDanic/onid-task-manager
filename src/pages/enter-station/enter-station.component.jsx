import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { db } from "../../firebase/firebase.utils";

import Board from "../board/board.component";
import StationMenu from "../../components/create-station/station-menu/station-menu.component";

import "./enter-station.stayles.scss";

const EnterStation = () => {
  const history = useHistory();
  const currentSpaceId = history.location.pathname.split("/")[2];
  const currentStationId = history.location.pathname.split("/")[4];
  const [station, setStation] = useState([]);

  useEffect(() => {
    if (!currentSpaceId) return;
    if (!currentStationId) return;
    db.collection("space")
      .doc(currentSpaceId)
      .collection("stations")
      .doc(currentStationId)
      .collection("tasks")
      .doc("tasks")
      .onSnapshot((stationData) => {
        setStation(stationData.data());
      });
  }, []);

  return (
    <div className="enterStation">
      <Route path="/s/:id/e/:id">
        <StationMenu />
      </Route>
      <Route
        exact
        path="/s/:id/e/:id/b"
        render={() => <Board station={station} direction="horizontal" />}
      />
      <Route
        exact
        path="/s/:id/e/:id/l"
        render={() => <Board station={station} direction="vertical" />}
      />
    </div>
  );
};

export default EnterStation;
