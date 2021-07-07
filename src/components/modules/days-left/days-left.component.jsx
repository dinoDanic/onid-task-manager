import React, { useMemo, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

import "./days-left-styles.scss";

const DaysLeft = ({ task }) => {
  let [daysLeft, setDaysLeft] = useState(null);
  const [daysColor, setDaysColor] = useState("gray");

  useMemo(() => {
    const { created, deadline } = task;
    if (!created || !deadline) return;

    let cd = created.toDate();
    let dd = deadline.toDate();

    let cdt = cd.getTime();
    let ddt = dd.getTime();

    let differenceInTime = cdt - ddt;
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);

    setDaysLeft(Math.round(-differenceInDays) + 1);

    if (daysLeft < 3) setDaysColor("rgb(226, 68, 92)");
    if (daysLeft > 3) setDaysColor("rgb(52, 181, 228)");
    if (daysLeft > 15) setDaysColor("rgb(5, 206, 145)");
  }, [task, daysLeft]);

  return (
    <div className="daysLeft">
      <p style={{ color: daysColor }}>
        {daysLeft > 0 && `${daysLeft} days`}
        {daysLeft === 0 && `today`}
        {daysLeft === null && `no deadline set`}
        {daysLeft !== null && <FontAwesomeIcon icon={faHourglassHalf} />}
      </p>
    </div>
  );
};

export default DaysLeft;
