import React from "react";

import "./retro-label.styles.scss";

const RetroLabel = ({ children }) => {
  return (
    <div className="retroLabel">
      <div className="retroLabel-box">
        <p>{children}</p>
      </div>
    </div>
  );
};

export default RetroLabel;
