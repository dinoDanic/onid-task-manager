import React, { useMemo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setTimeZone } from "../../../redux/filter/filter.actions";

import "./days-left-styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarTimes } from "@fortawesome/free-solid-svg-icons";

import Tooltip from "../../../components/retro/tooltip/tooltip.component";

const DaysLeft = ({ task }) => {
  const [daysLeft, setDaysLeft] = useState(null);
  const [daysLeftText, setDaysLeftText] = useState("");
  const [daysColor, setDaysColor] = useState("gray");
  const dispatch = useDispatch();
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

    setDaysLeft(diffInDays);

    if (daysLeft < 0) setDaysColor("rgb(226, 68, 92)");
    if (daysLeft >= 0) setDaysColor("rgb(52, 181, 228)");
    if (daysLeft > 5) setDaysColor("rgb(5, 206, 145)");

    if (daysLeft === 0) {
      setDaysLeftText("today");
    }
    if (daysLeft < 0) {
      setDaysLeftText(`${daysLeft} days`);
    }
    if (daysLeft === 1) {
      setDaysLeftText(`tomorrow`);
    }
    if (daysLeft > 1 && daysLeft < 8) {
      setDaysLeftText(`${daysLeft} days`);
    }
    if (daysLeft > 7) {
      setDaysLeftText(`${daysLeft} days`);
    }
  }, [daysLeft, task]);

  useEffect(() => {
    if (daysLeft === 0) {
      const state = { taskId: task.id, zone: 0 };
      dispatch(setTimeZone(state));
      return;
    }
    if (daysLeft < 0) {
      const state = { taskId: task.id, zone: null };
      dispatch(setTimeZone(state));
      return;
    }
    if (daysLeft === 1) {
      const state = { taskId: task.id, zone: 1 };
      dispatch(setTimeZone(state));
      return;
    }
    if (daysLeft > 1 && daysLeft < 8) {
      const state = { taskId: task.id, zone: 7 };
      dispatch(setTimeZone(state));
      return;
    }
    if (daysLeft > 7) {
      const state = { taskId: task.id, zone: 30 };
      dispatch(setTimeZone(state));
      return;
    }
  }, [daysLeft]);

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
