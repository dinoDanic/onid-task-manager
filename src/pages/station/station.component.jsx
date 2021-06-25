import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase.utils";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { useActiveSpaceData } from "../../hooks/useActiveSpaceData.hook";

import RetroButton from "../../components/retro/button/retro-button.component";
import Stations from "../../components/stations/stations.component";
import MiniMenu from "../../components/mini-menu/mini-menu.component";
import BoxLayer from "../../components/retro/box-layer/box-layer.component";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import "./station.syles.scss";

const Station = () => {
  const currentUserUid = useSelector((state) => state.user.currentUser.uid);
  const activeSpaceData = useActiveSpaceData();
  const history = useHistory();
  const activeSpaceId = history.location.pathname.split("/")[2];
  const [miniMenu, setMiniMenu] = useState(false);

  useEffect(async () => {
    const docRef = await db.collection("space").doc(activeSpaceId).get();
    const spaceData = docRef.data();
    if (!spaceData.members.includes(currentUserUid)) {
      alert("u have no acces");
      history.push("/");
    }
  }, []);

  return (
    <motion.div
      className="station"
      /*  initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ type: "tween" }} */
    >
      <p className="station__pre">Station</p>
      {activeSpaceData && (
        <div className="station__header">
          <div className="station__name">
            <RetroButton style={{ background: activeSpaceData.color }}>
              {activeSpaceData.name.charAt(0)}
            </RetroButton>
            <h3>{activeSpaceData.name}</h3>
          </div>
          <div className="station__menu">
            <RetroButton mode="flat" onClick={() => setMiniMenu(true)}>
              <MoreHorizIcon />
            </RetroButton>
            {miniMenu && (
              <BoxLayer setLayer={setMiniMenu}>
                <MiniMenu setMiniMenu={setMiniMenu} />
              </BoxLayer>
            )}
          </div>
        </div>
      )}
      <Stations />
    </motion.div>
  );
};

export default Station;
