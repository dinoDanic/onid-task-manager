import React from "react";
import { useSelector } from "react-redux";

import FirePriority from "./fire-priority.component.jsx/fire-priority.component";
import TimeFilter from "./time-filter/time-filter.component";

import "./filter-styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const Filter = () => {
  const filter = useSelector((state) => state.filter);

  return (
    <div className="filter">
      <div className="filter__priority">
        <div className="filter__priority-text">
          <FontAwesomeIcon icon={faFilter} />
        </div>
        <div className="filter__priority-fire">
          {filter.status.map((priority) => {
            return <FirePriority key={priority.name} priority={priority} />;
          })}
        </div>
      </div>
      <div className="filter__time">
        <TimeFilter time={filter.time} />
      </div>
    </div>
  );
};

export default Filter;
