import React, { useState, useEffect } from "react";
import { db, createNewStation } from "../../firebase/firebase.utils";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { setStationData } from "../../redux/space/space.actions";

import RetroButton from "../retro/button/retro-button.component";
import RetroInput from "../retro/input/input.component";
import StationItem from "../station-item/station-item.component.class";
import BoxLayer from "../retro/box-layer/box-layer.component";

import "./stations.styles.scss";

const Stations = () => {
  const stationData = useSelector((state) => state.space.stationData);
  const [createStation, setCreateStation] = useState(false);
  const [newStationName, setNewStationName] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const activeSpaceId = history.location.pathname.split("/")[2];

  useEffect(() => {
    db.collection("space")
      .doc(activeSpaceId)
      .collection("stations")
      .orderBy("created", "asc")
      .onSnapshot((querySnapshot) => {
        let docs = [];
        querySnapshot.forEach((doc) => {
          docs.push(doc.data());
        });
        dispatch(setStationData(docs));
      });
  }, [activeSpaceId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newStationName === "") {
      alert("no name");
      return;
    }
    createNewStation(activeSpaceId, newStationName);
    setCreateStation(false);
    setNewStationName("");
  };

  return (
    <div className="stations">
      <div className="stations__createStation">
        <RetroButton onClick={() => setCreateStation(!createStation)}>
          {createStation ? "Cancel" : "Create station"}
        </RetroButton>
      </div>
      <div className="stations__stationItem">
        {stationData?.map((station) => (
          <StationItem key={station.stationsId} data={station} />
        ))}
      </div>
      <AnimatePresence>
        {createStation && (
          <BoxLayer setLayer={setCreateStation}>
            <div className="staions__createPop">
              <h2>Create Station</h2>
            </div>
          </BoxLayer>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stations;
