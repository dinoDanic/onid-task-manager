import React from "react";

import "./views.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns, faTasks } from "@fortawesome/free-solid-svg-icons";

const Views = ({ view }) => {
  return (
    <div className="views">
      <div
        className="views__board views__view"
        style={{ background: view === "b" ? "#f0f2f5" : "" }}
      >
        <FontAwesomeIcon icon={faColumns} />
        <p>Board</p>
      </div>
      <div
        className="views__list views__view"
        style={{ background: view === "l" ? "#f0f2f5" : "" }}
      >
        <FontAwesomeIcon icon={faTasks} />
        <p>List</p>
      </div>
    </div>
  );
};

export default Views;
