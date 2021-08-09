import React from "react";

import "./retro-label.styles.scss";

const RetroLabel = ({ children, color, ...otherPorps }) => {
  return (
    <div className={`retroLabel `} {...otherPorps}>
      <div className={`retroLabel-box ${color}`}>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default RetroLabel;
