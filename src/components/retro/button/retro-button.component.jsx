import React from "react";

import "./retro-button.styles.scss";

function RetroButton({ children, mode, charAt, size, color, ...otherProps }) {
  return (
    <button className={`retroButton ${mode} ${size} ${color} `} {...otherProps}>
      {charAt ? (
        <div className="charAt">
          {children.charAt(0)}
          <div className="charAtFull">{children}</div>
        </div>
      ) : (
        <div className="children">{children}</div>
      )}
    </button>
  );
}

export default RetroButton;
