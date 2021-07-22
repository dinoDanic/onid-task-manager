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

    setDaysLeft(Math.round(-differenceInDays) + 1);

    if (daysLeft < 0) setDaysColor("rgb(226, 68, 92)");
    if (daysLeft >= 0) setDaysColor("rgb(52, 181, 228)");
    if (daysLeft > 5) setDaysColor("rgb(5, 206, 145)");

    if (daysLeft === 0) {
      setDaysLeftText("today");
      setTimeTask(spaceId, stationId, "today", task.id);
    }
    if (daysLeft === 1) {
      setDaysLeftText(`tomorrow`);
      setTimeTask(spaceId, stationId, "tomorrow", task.id);
    }
    if (daysLeft > 1) {
      setDaysLeftText(`${daysLeft} days`);
    }
    if (daysLeft < 0) {
      setDaysLeftText("-");
      setTimeTask(spaceId, stationId, "", task.id);
    }
    if (daysLeft > 2 && daysLeft < 8) {
      setTimeTask(spaceId, stationId, "week", task.id);
    }
    if (daysLeft > 7) {
      setTimeTask(spaceId, stationId, "month", task.id);
    }
  }, [task, daysLeft]);

  return (
    <div className="daysLeft">
      <p style={{ color: daysColor }}>{daysLeftText}</p>
    </div>
  );
};

export default DaysLeft;
