import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "./tooltip.styles.scss";

const Tooltip = ({ text }) => {
  return (
    <div className="tooltip">
      <div className="tooltip__text">{text}</div>
      <div className="tooltip__arrow">
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
    </div>
  );
};

export default Tooltip;
