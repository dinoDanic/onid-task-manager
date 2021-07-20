import React from "react";

import { motion } from "framer-motion";

import "./box-right.styles.scss";

const BoxRight = ({ children, setLayer }) => {
  return (
    <motion.div
      className="boxRight"
      initial={{ x: "40%" }}
      animate={{ x: 0 }}
      transition={{ type: "ease", duration: 0.4 }}
      exit={{ x: "40%" }}
    >
      <div className="boxRight__layer" onClick={() => setLayer(false)} />
      <div className="boxRight__content">{children}</div>
    </motion.div>
  );
};

export default BoxRight;
