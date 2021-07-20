import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./views.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns, faTasks } from "@fortawesome/free-solid-svg-icons";

const Views = ({ view }) => {
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  return (
    <div className="views">
      <Link to={`/s/${spaceId}/e/${stationId}/b`}>
        <div
          className="views__board views__view"
          style={{
            background: view === "b" ? "#34b5e4" : "",
            color: view === "b" ? "white" : "",
          }}
        >
          <FontAwesomeIcon icon={faColumns} />
          <p
            style={{
              color: view === "b" ? "white" : "",
            }}
          >
            Board
          </p>
        </div>
      </Link>
      <Link to={`/s/${spaceId}/e/${stationId}/l`}>
        <div
          className="views__list views__view"
          style={{
            background: view === "l" ? "#34b5e4" : "",
            color: view === "l" ? "white" : "",
          }}
        >
          <FontAwesomeIcon icon={faTasks} />
          <p
            style={{
              color: view === "l" ? "white" : "",
            }}
          >
            List
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Views;
