import React, { useEffect, useState, useMemo } from "react";

import { useSelector } from "react-redux";
import Avatar from "../../retro/avatar/avatar.component";

import "./created-by.styles.scss";

const CreatedBy = React.memo(({ task }) => {
  const users = useSelector((state) => state.user.users);
  const [user, setUser] = useState({});
  const { createdBy } = task;

  useMemo(() => {
    if (!users) return;
    const userIndex = users.findIndex((item) => item.uid === createdBy);
    setUser(users[userIndex]);
  }, [users]);

  return (
    <div className="createdBy">
      <Avatar src={user?.imageUrl} />
      <p>{user?.userName?.split(" ")[0]}</p>
    </div>
  );
});

export default CreatedBy;
