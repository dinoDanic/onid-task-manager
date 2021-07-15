import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import BoxLayer from "../../retro/box-layer/box-layer.component";
import RetroButton from "../../retro/button/retro-button.component";

import {
  deleteSpace,
  removeMember,
  updateUser,
} from "../../../firebase/firebase.utils";

import { removeOneSpace } from "../../../redux/space/space.actions";

const DeleteStation = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.user.currentUser);
  const spaceId = useSelector((state) => state.history.spaceId);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const currentUserUid = currentUser.uid;

  useEffect(() => {
    const { admin } = data;
    if (currentUserUid === admin) {
      setIsUserAdmin(true);
    } else {
      setIsUserAdmin(false);
    }
  }, [currentUserUid, data]);

  const handleDeleteSpace = () => {
    deleteSpace(spaceId);
    dispatch(removeOneSpace(spaceId));
    history.push("/");
  };

  const handleLeaveSpace = () => {
    /*   let user = currentUser;
    let assignedArray = user.assignedTasks;
    let newUser = {};

    // check if got tasks
    const findFromThisSpace = assignedArray.filter(
      (item) => item.fromSpaceId === spaceId
    );
    console.log(findFromThisSpace);

    if (findFromThisSpace.length > 0) {
      alert(
        `you have ${findFromThisSpace.length} task assigned to you in this Space. Delete thouse tasks or unAssign your self`
      );
      return;
    }

    // remove assigned thigns
    if (assignedArray.length > 0) {
      let removed = assignedArray.filter(
        (item) => item.fromSpaceId !== spaceId
      );
      newUser = {
        ...user,
        assignedTasks: [...removed],
      };
    }
    // remove favorite things
    if (user.favoriteStations.length > 0) {
      user.favoriteStations = user.favoriteStations.filter(
        (staion) => staion.fromSpaceId !== spaceId
      );
      newUser = {
        ...user,
        favoriteStations: [...user.favoriteStations],
      };
    }

    // update tasks

    updateUser(newUser.uid, newUser); */
    removeMember(spaceId, currentUser.uid);
    dispatch(removeOneSpace(spaceId));
    history.push("/");
  };

  return (
    <>
      {isUserAdmin ? (
        <li onClick={() => setShowAction(!showAction)}>
          <div className="tooltip">Delete</div>
          <FontAwesomeIcon icon={faTrashAlt} />
        </li>
      ) : (
        <li onClick={() => setShowAction(!showAction)}>
          <div className="tooltip">Leave</div>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </li>
      )}
      {showAction && (
        <>
          <BoxLayer type="question" setLayer={setShowAction}>
            {!isUserAdmin ? (
              <>
                <h2>Leave {data.name} Space?</h2>
                <div className="dh__btns">
                  <RetroButton mode="gray" onClick={() => setShowAction(false)}>
                    cancel
                  </RetroButton>
                  <RetroButton
                    color="danger"
                    mode="flat"
                    onClick={() => handleLeaveSpace()}
                  >
                    Leave
                  </RetroButton>
                </div>
              </>
            ) : (
              <>
                <h2>Delete {data.name} Space?</h2>
                <div className="dh__btns">
                  <RetroButton mode="gray" onClick={() => setShowAction(false)}>
                    cancel
                  </RetroButton>
                  <RetroButton
                    color="danger"
                    mode="flat"
                    onClick={() => handleDeleteSpace()}
                  >
                    Delete
                  </RetroButton>
                </div>
              </>
            )}
          </BoxLayer>
        </>
      )}
    </>
  );
};

export default DeleteStation;
