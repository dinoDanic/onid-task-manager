import React, { useState, useMemo } from "react";
import { convertDate } from "../../../firebase/firebase.utils";

import "./created-date.styles.scss";

const CreatedDate = ({ task }) => {
  const [date, setDate] = useState("no date");
  useMemo(() => {
    if (!task) return;
    const d = convertDate(task.created);
    setDate(d);
  }, [task]);

  return (
    <div className="createDate">
      <p>{date}</p>
    </div>
  );
};

export default CreatedDate;
