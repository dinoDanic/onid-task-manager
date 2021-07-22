import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useActiveSpaceData } from "../../../hooks/useActiveSpaceData.hook";

import { AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";

import {
  assignMember,
  unAssign,
  updateUser,
} from "../../../firebase/firebase.utils";

import Avatar from "../../retro/avatar/avatar.component";
import BoxLayerLite from "../../retro/box-layer-lite/box-layer-lite.component";

import "./assign-styles.scss";

const Assign = ({ task }) => {
  const users = useSelector((state) => state.user.users);
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  const spaceData = useActiveSpaceData();

  const [showMembers, setShowMembers] = useState(false);
  const [assignedUser, setAssignedUser] = useState({});
  const [allMembers, setAllMembers] = useState([]);

  useMemo(() => {
    if (!users) return;
    if (spaceData) {
      const { members } = spaceData;
      let list = [];
      list = members.map((memberId) => {
        const memberFind = users.filter((item) => item.uid === memberId);
        return memberFind[0];
      });
      setAllMembers(list);
    }
  }, [spaceData, users]);

  useMemo(() => {
    if (!users) return;
    const { assign } = task;
    const getAssignUser = users.filter((item) => item.uid === assign);
    setAssignedUser(getAssignUser[0]);
  }, [task, users]);

  const handleAssignMember = (userId) => {
    if (task.assign) {
      let oldAssign = users.filter((user) => user.uid === task.assign);
      let oldUser = oldAssign[0];
      if (oldUser !== undefined) {
        oldUser.assignedTasks = oldUser.assignedTasks.filter(
          (item) => item.id !== task.id
        );

        updateUser(oldUser.uid, oldUser);
      }
    }
    let findUser = users.filter((user) => user.uid === userId);
    let theUser = findUser[0];

    theUser.assignedTasks.push(task);
    //za db.users
    updateUser(theUser.uid, theUser);
    //za db.tasks
    assignMember(spaceId, stationId, task.id, userId);
    setShowMembers(false);
  };

  const handleUnAssignMember = () => {
    unAssign(spaceId, stationId, task.id);
    setShowMembers(false);
  };
  return (
    <div className="assign">
      <div
        className="assign__assigned"
        onClick={() => setShowMembers(!showMembers)}
      >
        <Avatar src={assignedUser ? assignedUser.imageUrl : ""} />
        {assignedUser && (
          <p className="assign__nameHover">{assignedUser.userName}</p>
        )}
      </div>
      <AnimatePresence>
        {showMembers && (
          <div className="assign__choose">
            <BoxLayerLite setLayer={setShowMembers}>
              {allMembers?.map((member) => {
                const { imageUrl, userName, uid } = member;
                return (
                  <div
                    className="assign__member"
                    key={uid}
                    onClick={() => handleAssignMember(uid)}
                  >
                    <Avatar src={imageUrl} />
                    <p>{userName}</p>
                  </div>
                );
              })}
              <div
                className="assign__remove"
                onClick={() => handleUnAssignMember()}
              >
                <FontAwesomeIcon icon={faUserSlash} />
              </div>
            </BoxLayerLite>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Assign;
