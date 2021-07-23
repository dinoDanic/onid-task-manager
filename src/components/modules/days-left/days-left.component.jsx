import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimeTask } from "../../../firebase/firebase.utils";

import "./days-left-styles.scss";

const DaysLeft = ({ task }) => {
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  let [daysLeft, setDaysLeft] = useState(null);
  const [daysLeftText, setDaysLeftText] = useState("");
  const [daysColor, setDaysColor] = useState("gray");
  const dispatch = useDispatch();

  useMemo(() => {
    const { created, deadline } = task;
    if (!created) return;
    if (!deadline) return;

    if (deadline.seconds === undefined) return;
    let cd = created.toDate();
    let dd = deadline.toDate();

    let cdt = cd.getTime();
    let ddt = dd.getTime();

    let differenceInTime = cdt - ddt;
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);

    /* setDaysLeft(Math.round(-differenceInDays) + 1); */

    /* const date1 = new Date("7/13/2010");
    const date2 = new Date("12/15/2010"); */
    const diffTime = Math.abs(cd - dd);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = ddt - cdt;

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    console.log(diffInDays + 1);
    setDaysLeft(diffInDays + 1);

    if (daysLeft < 0) setDaysColor("rgb(226, 68, 92)");
    if (daysLeft >= 0) setDaysColor("rgb(52, 181, 228)");
    if (daysLeft > 5) setDaysColor("rgb(5, 206, 145)");

    if (daysLeft === 0) {
      setDaysLeftText("today");
      setTimeTask(spaceId, stationId, 0, task.id);
    }
    if (daysLeft === 1) {
      setDaysLeftText(`tomorrow`);
      setTimeTask(spaceId, stationId, 1, task.id);
    }
    if (daysLeft > 1) {
      setDaysLeftText(`${daysLeft} days`);
    }
    if (daysLeft < 0) {
      setDaysLeftText("-");
      setTimeTask(spaceId, stationId, "", task.id);
    }
    if (daysLeft > 1 && daysLeft < 8) {
      setTimeTask(spaceId, stationId, 7, task.id);
    }
    if (daysLeft > 7) {
      setTimeTask(spaceId, stationId, 30, task.id);
    }
  }, [task, daysLeft]);

  return (
    <div className="daysLeft">
      <p style={{ color: daysColor }}>{daysLeftText}</p>
    </div>
  );
};

export default DaysLeft;
