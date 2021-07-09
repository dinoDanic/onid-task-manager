import React, { useState } from "react";

import BoxLayerLite from "../box-layer-lite/box-layer-lite.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";

import "./mini-menu.styles.scss";

const MiniMenu = ({ icon, children, setLayer }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="miniMenu">
      <BoxLayerLite setLayer={setLayer}>{children}</BoxLayerLite>
    </div>
  );
};

export default MiniMenu;
