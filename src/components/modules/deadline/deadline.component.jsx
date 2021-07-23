import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

import { setDeadlineDate } from "../../../firebase/firebase.utils";

import "./deadline.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const Deadline = ({ task }) => {
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  const [date, setDate] = useState();

  useMemo(() => {
    if (!task);
    if (task.deadline === null) return;
    let d = task.deadline.toDate();
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    setDate(`${day}.${month + 1}.`);
  }, [task]);

  const handleDate = (e) => {
    let dd = new Date(e.target.value);

    // set date order
    let day = dd.getDate();
    let month = dd.getMonth();
    let year = dd.getFullYear();
    setDeadlineDate(spaceId, stationId, dd, task.id);
  };

  return (
    <div className="deadline">
      <input type="date" onChange={(e) => handleDate(e)} />
      {!date && <FontAwesomeIcon icon={faCalendarAlt} />}
      <p>{date}</p>
    </div>
  );
};

export default Deadline;
