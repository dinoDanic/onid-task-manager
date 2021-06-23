import React from "react";

import Box from "../retro/box/box.component";

import "./section-box.component.scss";

const SectionBox = ({ title, subTitle, children }) => {
  return (
    <div className="sectionBox">
      <div className="sb__title">
        <h2>{title}</h2>
        <p>{subTitle}</p>
      </div>
      <div className="sb__contect">
        <Box>{children}</Box>
      </div>
    </div>
  );
};

export default SectionBox;
