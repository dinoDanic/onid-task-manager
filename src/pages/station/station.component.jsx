import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.utils";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import Stations from "../../components/stations/stations.component";

import { setOpen } from "../../redux/space/space.actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { setOpenFb } from "../../firebase/firebase.utils";

import "./station.syles.scss";

const Station = () => {
  const currentUserUid = useSelector((state) => state.user.currentUser.uid);
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  const open = useSelector((state) => state.space.open);
  const [x, setX] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!spaceId) return;

    async function fetchData() {
      const docRef = await db.collection("space").doc(spaceId).get();
      const spaceData = docRef.data();
      if (!spaceData) return;
      if (!spaceData.members.includes(currentUserUid)) {
        alert("u have no acces");
        history.push("/");
      }
    }
    fetchData();
  }, [spaceId, stationId]);

  useEffect(() => {
    if (open) {
      setX(0);
    } else {
      setX("-220px");
    }
  }, [open]);

  const handleMini = () => {
    dispatch(setOpen(!open));
    setOpenFb(spaceId, open);
  };

  return (
    <motion.div
      className="station"
      animate={{ marginLeft: x }}
      transition={{ ease: "easeOut" }}
    >
      <motion.div className="station__hide" animate={{ x: open ? "" : -8 }}>
        <FontAwesomeIcon icon={faBars} onClick={() => handleMini()} />
      </motion.div>
      <Stations />
    </motion.div>
  );
};

export default Station;
