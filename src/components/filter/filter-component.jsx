import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setFilterNull } from "../../redux/filter/filter.actions";

import FirePriority from "./fire-priority.component.jsx/fire-priority.component";
import TimeFilter from "./time-filter/time-filter.component";
import PersonFilter from "./person-filter/person-filter.component";

import "./filter-styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <div className="filter">
      <div className="filter__text" onClick={() => dispatch(setFilterNull())}>
        <FontAwesomeIcon icon={faFilter} />
      </div>
      <div className="filter__types">
        <div className="filter__priority">
          <div className="filter__priority-fire">
            {filter.status.map((priority) => {
              return <FirePriority key={priority.name} priority={priority} />;
            })}
          </div>
        </div>
        <div className="filter__time">
          <TimeFilter time={filter.time} />
        </div>
        <div className="filter__byPerson">
          <PersonFilter />
        </div>
      </div>
    </div>
  );
};

export default Filter;
