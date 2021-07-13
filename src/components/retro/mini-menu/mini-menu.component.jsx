import React from "react";

import BoxLayerLite from "../box-layer-lite/box-layer-lite.component";

import "./mini-menu.styles.scss";

const MiniMenu = ({ children, setLayer }) => {
  return (
    <div className="miniMenu">
      <BoxLayerLite setLayer={setLayer}>{children}</BoxLayerLite>
    </div>
  );
};

export default MiniMenu;
