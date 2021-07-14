import React, { useEffect, useState } from "react";

import Avatar from "../retro/avatar/avatar.component";

import { getUserDataWithId } from "../../firebase/firebase.utils";

import "./message.styles.scss";

const Message = ({ msg }) => {
  const [user, setUser] = useState({});
  console.log(msg.from);
  useEffect(async () => {
    const userData = await getUserDataWithId(msg.from);
    setUser(userData);
  }, []);
  return (
    <div className="message">
      <div className="message__avatar">
        <Avatar src={user?.image} />
      </div>
      <div className="message__msg">
        <p>{msg.message}</p>
      </div>
    </div>
  );
};

export default Message;
