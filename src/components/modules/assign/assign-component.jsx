import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase.utils";
import { useSelector } from "react-redux";

import Avatar from "../../retro/avatar/avatar.component";

import "./assign-styles.scss";

const Assign = ({ task }) => {
  const spaceId = useSelector((state) => state.history.spaceId);
  const [members, setMembers] = useState();

  useEffect(async () => {
    if (!spaceId) return;
    const currentSpaceRef = db.collection("space").doc(spaceId);
    const getMembersData = await currentSpaceRef.get();
    const membersData = getMembersData.data().members;
    setMembers(membersData);
  }, [spaceId]);
  return (
    <div className="assign">
      <Avatar />
    </div>
  );
};

export default Assign;
