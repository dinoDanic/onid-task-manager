import React from "react";
import { motion } from "framer-motion";

import Box from "../box/box.component";

import "./box-layer.styles.scss";

const BoxLayer = ({ children, setLayer }) => {
  return (
    <motion.div className="boxLayer">
      <motion.div
        className="bl__layer"
        onClick={() => setLayer(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.div
        className="bl__content"
        initial={{ y: -36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Box>{children}</Box>
      </motion.div>
    </motion.div>
  );
};

export default BoxLayer;
