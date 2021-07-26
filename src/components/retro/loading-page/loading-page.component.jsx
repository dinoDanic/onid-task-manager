import React from "react";
import { motion } from "framer-motion";
import "./loading-page.styles.scss";

const LoadingPage = () => {
  return (
    <motion.div
      class="loadingPage"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="loadingPage__item">
        <div class="push-pop loader ">
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="loadingPage__logo loadingPage__item">
        <h1>onid</h1>
      </div>
    </motion.div>
  );
};

export default LoadingPage;
