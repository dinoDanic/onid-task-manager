import React from "react";

import "./box.styles.scss";

const Box = ({ children, ...otherProps }) => (
  <div className="retroBox" {...otherProps}>
    {children}
  </div>
);

export default Box;
