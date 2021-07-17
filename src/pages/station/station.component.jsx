import React, { useEffect } from "react";
import { db } from "../../firebase/firebase.utils";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import Stations from "../../components/stations/stations.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";

import "./station.syles.scss";

const Station = () => {
  const currentUserUid = useSelector((state) => state.user.currentUser.uid);
  const activeSpaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  const history = useHistory();

  useEffect(() => {
    if (!activeSpaceId) return;

    async function fetchData() {
      const docRef = await db.collection("space").doc(activeSpaceId).get();
      const spaceData = docRef.data();
      if (!spaceData) return;
      if (!spaceData.members.includes(currentUserUid)) {
        alert("u have no acces");
        history.push("/");
      }
    }
    fetchData();
  }, [activeSpaceId, stationId]);

  return (
    <motion.div className="station">
      <div className="station__hide">
        <FontAwesomeIcon icon={faArrowsAltH} />
      </div>
      <Stations />
    </motion.div>
  );
};

export default Station;
