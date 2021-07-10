import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setDeadlineDate } from "../../../firebase/firebase.utils";

import { setUser } from "../../../redux/user/user.actions";

import "./deadline.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

const Deadline = ({ task }) => {
  const spaceId = useSelector((state) => state.history.spaceId);
  const currentUser = useSelector((state) => state.user.currentUser);
  const stationId = useSelector((state) => state.history.stationId);
  const dispatch = useDispatch();
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

    // set date order
    let day = dd.getDate();
    let month = dd.getMonth();
    let year = dd.getFullYear();
    setDate(`${day}.${month + 1}.${year}`);
    setDeadlineDate(spaceId, stationId, dd, task.id);

    // set user
    let assignArray = currentUser.assignedTasks;
    let i = assignArray.findIndex((item) => item.id === task.id);
    if (i === -1) return;
    assignArray[i].deadline = dd;
    let newUser = {
      ...currentUser,
      assignedTasks: [...assignArray],
    };
    dispatch(setUser(newUser));
  };
  useMemo(() => {
    if (!task);
    if (task.deadline === null) return;
    let d = task.deadline.toDate();
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    setDate(`${day}.${month + 1}.${year}`);
  }, [task]);

  return (
    <div className="deadline">
      <input type="date" onChange={(e) => handleDate(e)} />
      <FontAwesomeIcon icon={faCalendarAlt} />

      <p>{date}</p>
    </div>
  );
};

export default Deadline;
