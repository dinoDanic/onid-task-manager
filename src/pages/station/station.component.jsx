import React from "react";
import { motion } from "framer-motion";

import { useActiveSpaceData } from "../../hooks/useActiveSpaceData.hook";

import RetroButton from "../../components/retro/button/retro-button.component";
import Stations from "../../components/stations/stations.component";

import "./station.syles.scss";

const Station = () => {
  const activeSpaceData = useActiveSpaceData();
  return (
    <motion.div
      className="station"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ type: "tween" }}
    >
      {activeSpaceData && (
        <div className="station__header">
          <RetroButton style={{ background: activeSpaceData.color }}>
            {activeSpaceData.name.charAt(0)}
          </RetroButton>
          <h3>{activeSpaceData.name}</h3>
        </div>
      )}
      <Stations />
    </motion.div>
  );
};

export default Station;
