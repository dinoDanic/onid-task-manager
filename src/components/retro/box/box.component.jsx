import React from "react";
import { BoxContainer } from "./box.styles";

const Box = ({ children, ...otherProps }) => (
  <BoxContainer {...otherProps}>{children}</BoxContainer>
);

export default Box;
