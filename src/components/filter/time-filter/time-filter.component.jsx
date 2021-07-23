import React from "react";
import { useDispatch } from "react-redux";

import { toggleTime } from "../../../redux/filter/filter.actions";

import "./time-filter.styles.scss";

const TimeFilter = ({ time }) => {
  const dispatch = useDispatch();
  return (
    <div className="timeFilter">
      <div
        className={`timeFilter-today timeFilter-item ${
          time === 0 && "timeFilter__active"
        }`}
        onClick={() => dispatch(toggleTime(0))}
      >
        <p>Today</p>
      </div>
      <div
        className={`timeFilter-tomorrow timeFilter-item ${
          time === 1 && "timeFilter__active"
        }`}
        onClick={() => dispatch(toggleTime(1))}
      >
        <p>Tomorrow</p>
      </div>
      <div
        className={`timeFilter-week timeFilter-item ${
          time === 7 && "timeFilter__active"
        }`}
        onClick={() => dispatch(toggleTime(7))}
      >
        <p>Week</p>
      </div>
      <div
        className={`timeFilter-month timeFilter-item ${
          time === 30 && "timeFilter__active"
        }`}
        onClick={() => dispatch(toggleTime(30))}
      >
        <p>Month</p>
      </div>
    </div>
  );
};

export default TimeFilter;
