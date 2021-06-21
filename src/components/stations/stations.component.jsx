import React, { useState, useEffect } from "react";
import { db, createNewStation } from "../../firebase/firebase.utils";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { setStationData } from "../../redux/space/space.actions";

import RetroButton from "../retro/button/retro-button.component";
import RetroInput from "../retro/input/input.component";
import StationItem from "../station-item/station-item.component.class";

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
      .onSnapshot((querySnapshot) => {
        let docs = [];
        querySnapshot.forEach((doc) => {
          docs.push(doc.data());
        });
        dispatch(setStationData(docs));
      });
  }, [activeSpaceId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newStationName === "") {
      alert("no name");
      return;
    }
    createNewStation(activeSpaceId, newStationName);
    this.setState({ createStation: false, newStationName: "" });
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
          <motion.div
            className="stations__input"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <form onSubmit={(e) => handleSubmit(e)}>
              <div onChange={(e) => setNewStationName(e.target.value)}>
                <RetroInput placeholder="Station name" />
                <div className="stations__ok">
                  <RetroButton type="submit">ok</RetroButton>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stations;
