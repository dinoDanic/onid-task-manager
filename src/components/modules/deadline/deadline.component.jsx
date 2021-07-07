import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

import { setDeadlineDate } from "../../../firebase/firebase.utils";

import "./deadline.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

const Deadline = ({ task }) => {
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  const [date, setDate] = useState();
  const [daysLeft, setDaysLeft] = useState(null);

  const handleDate = (e) => {
    const { created } = task;
    let cd = created.toDate();
    let dd = new Date(e.target.value);

    let cdt = cd.getTime();
    let ddt = dd.getTime();

    let differenceInTime = cdt - ddt;
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);

    setDaysLeft(Math.round(-differenceInDays));
    console.log(daysLeft);

    // set date order
    let day = dd.getDate();
    let month = dd.getMonth();
    let year = dd.getFullYear();
    setDate(`${day}.${month + 1}.${year}`);
    setDeadlineDate(spaceId, stationId, dd, task.id);
  };
  useMemo(() => {
    if (!task);
    let d = task.deadline.toDate();
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    setDate(`${day}.${month + 1}.${year}`);
  }, [task]);

  console.log(task);
  return (
    <div className="deadline">
      <input type="date" onChange={(e) => handleDate(e)} />
      <FontAwesomeIcon icon={faCalendarAlt} />

      <p>{date}</p>
      {/*  {daysLeft} */}
    </div>
  );
};

export default Deadline;
