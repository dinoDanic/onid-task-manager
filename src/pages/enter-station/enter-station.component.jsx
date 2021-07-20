import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { db } from "../../firebase/firebase.utils";

import Board from "../board/board.component";
import List from "../list/list.component";
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
  }, [currentSpaceId, currentStationId]);

  return (
    <div className="enterStation">
      <Route path="/s/:id/e/:id">
        <StationMenu />
      </Route>
      <Route
        exact
        path="/s/:id/e/:id/b"
        render={() => <Board station={station} />}
      />
      <Route
        exact
        path="/s/:id/e/:id/l"
        render={() => <List station={station} />}
      />
    </div>
  );
};

export default EnterStation;
