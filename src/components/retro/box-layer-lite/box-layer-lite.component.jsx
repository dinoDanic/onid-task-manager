import React from "react";
import { motion } from "framer-motion";

import Box from "../box/box.component";

import "./box-layer.lite.styles.scss";

const BoxLayerLite = ({ children, setLayer }) => {
  return (
    <div className="boxLayerLite">
      <motion.div
        className="bll__content"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Box>{children}</Box>
      </motion.div>

      <div className="bll__layer" onClick={() => setLayer(false)} />
    </div>
  );
};

export default BoxLayerLite;
