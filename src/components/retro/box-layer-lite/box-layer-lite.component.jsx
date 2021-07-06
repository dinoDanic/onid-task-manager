import React from "react";
import { motion } from "framer-motion";

import Box from "../box/box.component";

import "./box-layer.lite.styles.scss";

const BoxLayerLite = ({ children, setLayer }) => {
  return (
    <div className="boxLayerLite">
      <motion.div
        className="bll__content"
        initial={{ y: -50, opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -50, opacity: 0, scale: 0.5 }}
      >
        <Box>{children}</Box>
      </motion.div>

      <div className="bll__layer" onClick={() => setLayer(false)} />
    </div>
  );
};

export default BoxLayerLite;
