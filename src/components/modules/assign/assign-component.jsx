import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useActiveSpaceData } from "../../../hooks/useActiveSpaceData.hook";

import { motion } from "framer-motion";

import { assignMember } from "../../../firebase/firebase.utils";

import Avatar from "../../retro/avatar/avatar.component";
import BoxLayerLite from "../../retro/box-layer-lite/box-layer-lite.component";

import "./assign-styles.scss";

const Assign = ({ task }) => {
  const users = useSelector((state) => state.user.users);
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  const [showMembers, setShowMembers] = useState(false);
  const spaceData = useActiveSpaceData();
  const [allMembers, setAllMembers] = useState([]);

  useMemo(() => {
    if (spaceData) {
      const { members } = spaceData;
      let list = [];
      members.map((memberId) => {
        const memberFind = users.filter((item) => item.uid === memberId);
        list.push(memberFind[0]);
      });
      setAllMembers(list);
    }
  }, [spaceData]);
  /* console.log(task); */
  return (
    <div className="assign">
      <div
        className="assign__assigned"
        onClick={() => setShowMembers(!showMembers)}
      >
        <Avatar />
      </div>
      {showMembers && (
        <motion.div
          className="assign__choose"
          /*  initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }} */
        >
          <BoxLayerLite setLayer={setShowMembers}>
            {allMembers?.map((member) => {
              console.log(task.id);
              const { imageUrl, userName, uid } = member;
              return (
                <div
                  className="assign__member"
                  onClick={() => assignMember(spaceId, stationId, task.id, uid)}
                >
                  <Avatar src={imageUrl} />
                  <p>{userName}</p>
                </div>
              );
            })}
          </BoxLayerLite>
        </motion.div>
      )}
    </div>
  );
};

export default Assign;
