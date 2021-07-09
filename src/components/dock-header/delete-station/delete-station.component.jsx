import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { useActiveSpaceData } from "../../../hooks/useActiveSpaceData.hook";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import BoxLayer from "../../retro/box-layer/box-layer.component";
import RetroButton from "../../retro/button/retro-button.component";

import { deleteSpace, removeMember } from "../../../firebase/firebase.utils";

import { removeOneSpace } from "../../../redux/space/space.actions";
import { current } from "@reduxjs/toolkit";

const DeleteStation = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUserUid = useSelector((state) => state.user.currentUser.uid);
  const spaceId = useSelector((state) => state.history.spaceId);
  const activeSpaceData = useActiveSpaceData();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [showAction, setShowAction] = useState(false);

  useEffect(() => {
    const { admin } = activeSpaceData;
    if (currentUserUid === admin) {
      setIsUserAdmin(true);
    } else {
      setIsUserAdmin(false);
    }
  }, []);

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
                <h2>Leace {data.name} Station?</h2>
                <div className="dh__btns">
                  <RetroButton mode="gray" onClick={() => setShowAction(false)}>
                    cancel
                  </RetroButton>
                  <RetroButton
                    color="danger"
                    mode="flat"
                    onClick={() => {
                      removeMember(spaceId, currentUserUid);
                      history.push("/");
                    }}
                  >
                    Leave
                  </RetroButton>
                </div>
              </>
            ) : (
              <>
                <h2>Delete {data.name} Station?</h2>
                <div className="dh__btns">
                  <RetroButton mode="gray" onClick={() => setShowAction(false)}>
                    cancel
                  </RetroButton>
                  <RetroButton
                    color="danger"
                    mode="flat"
                    onClick={() => {
                      deleteSpace(spaceId);
                      dispatch(removeOneSpace(spaceId));
                      history.push("/");
                    }}
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
