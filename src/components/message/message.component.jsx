import React, { useEffect, useState } from "react";

import Avatar from "../retro/avatar/avatar.component";

import { getUserDataWithId } from "../../firebase/firebase.utils";

import "./message.styles.scss";

const Message = ({ msg }) => {
  const [user, setUser] = useState({});
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [days, setDays] = useState(null);
  const [time, setTime] = useState("?");
  useEffect(async () => {
    const userData = await getUserDataWithId(msg.from);
    setUser(userData);
  }, []);

  useEffect(() => {
    if (!msg.created) return;
    const { created } = msg;

    const now = new Date();
    let cd = created.toDate();

    let c_h = cd.getHours();
    let c_m = cd.getMinutes();
    let c__time = cd.getTime();

    let n__time = now.getTime();

    let differenceInTime = c__time - n__time;
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);

    // get total seconds between the times
    var delta = Math.abs(cd - now) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    setHours(hours);
    setMinutes(minutes);
    setDays(days);
  }, [msg]);

  useEffect(() => {
    if ((days === null, hours === null, minutes === null)) return;
    console.log("days", days, "hours", hours, "minutes", minutes);
    if (days < 1 && hours < 1 && minutes < 1) {
      setTime("Just now");
    }
    if (days < 1 && hours < 1 && minutes === 1) {
      setTime(`${minutes} minute ago`);
    }
    if (days < 1 && hours < 1 && minutes > 0) {
      setTime(`${minutes} minutes ago`);
    }
    if (days < 1 && hours === 1 && minutes > 0) {
      setTime(`${hours} hour ago`);
    }
    if (days < 1 && hours > 1 && minutes > 0) {
      setTime(`${hours} hours ago`);
    }
    if (days === 1 && hours > 1 && minutes > 0) {
      setTime(`${days} day ago`);
    }
    if (days > 1 && hours > 1 && minutes > 0) {
      setTime(`${days} days ago`);
    }
  }, [days, hours, minutes]);

  return (
    <div className="message">
      <div className="message__avatar">
        <Avatar src={user?.imageUrl} />
      </div>
      <div className="message__msg">
        <div className="message__user">
          <div className="message__user-name">
            <p>
              <b>{user?.userName}</b>
            </p>
          </div>
          <div className="message__user-time">
            <p>{time}</p>
          </div>
        </div>
        <p>{msg.message}</p>
      </div>
    </div>
  );
};

export default Message;
