import React from "react";
import { useDispatch } from "react-redux";

import { toggleTime } from "../../../redux/filter/filter.actions";

import "./time-filter.styles.scss";

const TimeFilter = ({ time }) => {
  const dispatch = useDispatch();
  return (
    <div className="timeFilter">
      <div
        className="timeFilter-today timeFilter-item"
        onClick={() => dispatch(toggleTime("today"))}
      >
        <p>Today</p>
      </div>
      <div
        className="timeFilter-tomorrow timeFilter-item"
        onClick={() => dispatch(toggleTime("tomorrow"))}
      >
        <p>Tomorrow</p>
      </div>
      <div
        className="timeFilter-week timeFilter-item"
        onClick={() => dispatch(toggleTime("week"))}
      >
        <p>Week</p>
      </div>
      <div
        className="timeFilter-month timeFilter-item"
        onClick={() => dispatch(toggleTime("month"))}
      >
        <p>Month</p>
      </div>
    </div>
  );
};

export default TimeFilter;
