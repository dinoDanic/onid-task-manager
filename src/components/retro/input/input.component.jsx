import React from "react";

import "./input.styles.scss";

const RetroInput = React.forwardRef((props, ref) => (
  <input className="retroInput" ref={ref} {...props} />
));
export default RetroInput;
