import React, { useState, useMemo } from "react";
import { convertDate } from "../../../firebase/firebase.utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";

import "./created-date.styles.scss";

const CreatedDate = ({ task }) => {
  const [date, setDate] = useState("no date");
  console.log(task);

  useMemo(() => {
    if (!task) return;
    const d = convertDate(task.created);
    setDate(d);
  }, [task]);

  return (
    <div className="createDate">
      <FontAwesomeIcon icon={faCalendarDay} />
      <p>{date}</p>
    </div>
  );
};

export default CreatedDate;
