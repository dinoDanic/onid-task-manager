import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setTimeTask } from "../../../firebase/firebase.utils";

import "./days-left-styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarTimes } from "@fortawesome/free-solid-svg-icons";

import Tooltip from "../../../components/retro/tooltip/tooltip.component";

const DaysLeft = ({ task }) => {
  console.log("days left component");
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  const [daysLeft, setDaysLeft] = useState(null);
  const [daysLeftText, setDaysLeftText] = useState("");
  const [daysColor, setDaysColor] = useState("gray");
  const { created, deadline } = task;

  useMemo(() => {
    if (!created) return;
    if (!deadline) return;

    if (deadline.seconds === undefined) return;
    let cd = created.toDate();
    let dd = deadline.toDate();

    let cdt = cd.getTime();
    let ddt = dd.getTime();

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = ddt - cdt;

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    setDaysLeft(diffInDays + 1);

    if (daysLeft < 0) setDaysColor("rgb(226, 68, 92)");
    if (daysLeft >= 0) setDaysColor("rgb(52, 181, 228)");
    if (daysLeft > 5) setDaysColor("rgb(5, 206, 145)");

    if (daysLeft === 0) {
      setDaysLeftText("today");
      setTimeTask(spaceId, stationId, 0, task.id);
      return;
    }
    if (daysLeft === 1) {
      setDaysLeftText(`tomorrow`);
      setTimeTask(spaceId, stationId, 1, task.id);
      return;
    }
    if (daysLeft < 0) {
      setDaysLeftText(`${daysLeft} days`);
      setTimeTask(spaceId, stationId, "", task.id);
      return;
    }
    if (daysLeft > 1 && daysLeft < 8) {
      setDaysLeftText(`${daysLeft} days`);
      setTimeTask(spaceId, stationId, 7, task.id);
      return;
    }
    if (daysLeft > 7) {
      setDaysLeftText(`${daysLeft} days`);
      setTimeTask(spaceId, stationId, 30, task.id);
      return;
    }
  }, [task, daysLeft]);

  return (
    <div className="daysLeft">
      {daysLeft === null && (
        <>
          <Tooltip text="no date" /> <FontAwesomeIcon icon={faCalendarTimes} />
        </>
      )}
      <p style={{ color: daysColor }}>{daysLeftText}</p>
    </div>
  );
};

export default DaysLeft;
