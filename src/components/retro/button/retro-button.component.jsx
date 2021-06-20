import React from "react";

import "./retro-button.styles.scss";

function RetroButton({ children, mode, charAt, size, ...otherProps }) {
  return (
    <button className={`retroButton ${mode} ${size} `} {...otherProps}>
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
