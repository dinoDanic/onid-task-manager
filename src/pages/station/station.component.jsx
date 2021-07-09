import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase.utils";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
/* import { Link } from "react-router-dom"; */

/* import { useActiveSpaceData } from "../../hooks/useActiveSpaceData.hook"; */
/* 
import RetroButton from "../../components/retro/button/retro-button.component"; */
import Stations from "../../components/stations/stations.component";
import MiniMenu from "../../components/mini-menu/mini-menu.component";
import BoxLayer from "../../components/retro/box-layer/box-layer.component";

/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"; */

import "./station.syles.scss";

const Station = () => {
  const currentUserUid = useSelector((state) => state.user.currentUser.uid);
  const activeSpaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  /* const activeSpaceData = useActiveSpaceData(); */
  const history = useHistory();
  const [miniMenu, setMiniMenu] = useState(false);

  useEffect(async () => {
    if (!activeSpaceId) return;
    const docRef = await db.collection("space").doc(activeSpaceId).get();
    const spaceData = docRef.data();
    /*  if (!spaceData) return; */
    if (!spaceData.members.includes(currentUserUid)) {
      alert("u have no acces");
      history.push("/");
    }
  }, [activeSpaceId, stationId]);

  return (
    <motion.div className="station">
      <Stations />
      <div className="station__miniMenu">
        {miniMenu && (
          <BoxLayer setLayer={setMiniMenu}>
            <MiniMenu setMiniMenu={setMiniMenu} />
          </BoxLayer>
        )}
      </div>
    </motion.div>
  );
};

export default Station;
