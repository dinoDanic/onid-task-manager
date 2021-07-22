import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleUrgent } from "../../redux/filter/filter.actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

import Tooltip from "../retro/tooltip/tooltip.component";

import "./filter-styles.scss";

const Filter = () => {
  const urgent = useSelector((state) => state.filter.urgent);
  const dispatch = useDispatch();
  return (
    <div className="filter">
      <div className="filter__priority">
        <div className="filter__priority-text"></div>
        <div className="filter__priority-fire">
          <div
            className="filter__urgent filter__f"
            onClick={() => dispatch(toggleUrgent("urgent"))}
          >
            <Tooltip text="Urgent" />
            <FontAwesomeIcon icon={faFire} />
          </div>
          <div
            className="filter__high filter__f"
            onClick={() => dispatch(toggleUrgent("high"))}
          >
            <Tooltip text="High" />
            <FontAwesomeIcon icon={faFire} />
          </div>
          <div className="filter__normal filter__f">
            <Tooltip text="Normal" />
            <FontAwesomeIcon icon={faFire} />
          </div>
          <div className="filter__low filter__f">
            <Tooltip text="Low" />
            <FontAwesomeIcon icon={faFire} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
