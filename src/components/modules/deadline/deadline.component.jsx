import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

import { setDeadlineDate } from "../../../firebase/firebase.utils";

import Tooltip from "../../retro/tooltip/tooltip.component";

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
    setDate(`${day}.${month + 1}.`);
  }, [task]);

  const handleDate = (e) => {
    console.log(e.target.value);
    let dd = new Date(e.target.value);
    setDeadlineDate(spaceId, stationId, dd, task.id);
  };

  return (
    <div className="deadline">
      <input type="date" onChange={(e) => handleDate(e)} />
      <Tooltip text="Set deadline date" />
      {!date && <FontAwesomeIcon icon={faCalendarAlt} />}
      <p>{date}</p>
    </div>
  );
};

export default Deadline;
