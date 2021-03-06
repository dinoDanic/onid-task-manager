import React, { useState, useMemo } from "react";

import { useSelector } from "react-redux";
import Avatar from "../../retro/avatar/avatar.component";
import Tooltip from "../../retro/tooltip/tooltip.component";

import "./created-by.styles.scss";

const CreatedBy = ({ task }) => {
  const users = useSelector((state) => state.user.users);
  const [user, setUser] = useState({});
  const { createdBy } = task;

  useMemo(() => {
    if (!users) return;
    const userIndex = users.findIndex((item) => item.uid === createdBy);
    setUser(users[userIndex]);
  }, [users, createdBy]);

  return (
    <div className="createdBy">
      <Avatar src={user?.imageUrl} />
      <Tooltip text={`Created by ${user.userName}`} />
    </div>
  );
};

export default CreatedBy;
