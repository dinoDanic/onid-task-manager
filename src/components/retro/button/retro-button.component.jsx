import React from "react";

import "./retro-button.styles.scss";

function RetroButton({ children, ...otherProps }) {
  return (
    <button className="retroButton" {...otherProps}>
      <div className="children">{children}</div>
    </button>
  );
}

export default RetroButton;
