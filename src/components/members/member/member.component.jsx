import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { removeMember, newAdmin } from "../../../firebase/firebase.utils";

import RetroAvatar from "../../retro/avatar/avatar.component";
import RetroButton from "../../retro/button/retro-button.component";
import BoxLayer from "../../retro/box-layer/box-layer.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import "./member.styles.scss";
import { AnimatePresence } from "framer-motion";

function Member({ member, activeSpaceData, activeSpaceId }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);
  const { admin, spaceId } = activeSpaceData;
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [adminStatus, setAdminStatus] = useState(false);

  useEffect(() => {
    if (admin === member.uid) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [admin, member]);

  const handleRemove = () => {
    console.log("admin", admin);
    console.log("currentUesr", currentUser.uid);
    console.log("member", member.uid);

    if (member.uid === admin) {
      alert("cant delete admin");
      return;
    }
    if (currentUser.uid === member.uid) {
      alert("remove your self");
      return;
    }
    if (currentUser.uid === admin) {
      console.log("im admin ill delete you");
      setDeleteStatus(true);
      return;
    } else {
      alert("cant delet other users");
      return;
    }
  };

  const handleRemoveFull = () => {
    removeMember(spaceId, member.uid);
    alert("member removed");
    setDeleteStatus(false);
    history.go(0);
  };

  return (
    <>
      <div key={member.uid} className="member">
        <div className="member__user">
          <div className="member__avatar">
            <RetroAvatar src={member.imageUrl} />
          </div>
          <div className="member__name">
            <p>{member.userName}</p>
          </div>
        </div>

        <div className="member__controls">
          {currentUser.uid === admin && (
            <>
              {admin !== member.uid && (
                <>
                  <div
                    className="member__delete"
                    onClick={() => handleRemove()}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </div>
                  <div
                    className="member__noAdmin"
                    onClick={() => setAdminStatus(true)}
                  >
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                </>
              )}
            </>
          )}

          {isAdmin && (
            <div className="member__admin">
              <FontAwesomeIcon icon={faStar} />
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {deleteStatus && (
          <BoxLayer setLayer={setDeleteStatus}>
            <h3>Sure you want to remove {member.userName} ?</h3>
            <div className="member__deleteBtns">
              <RetroButton onClick={() => setDeleteStatus(false)} mode="gray">
                cancel
              </RetroButton>
              <RetroButton onClick={() => handleRemoveFull()}>yes</RetroButton>
            </div>
          </BoxLayer>
        )}
        {adminStatus && (
          <BoxLayer setLayer={setAdminStatus}>
            <h3>
              Sure you want to set <i>{member.userName}</i> as Admin?
            </h3>
            <div className="member__addBtns">
              <RetroButton onClick={() => setAdminStatus(false)} mode="gray">
                cancel
              </RetroButton>
              <RetroButton onClick={() => newAdmin(activeSpaceId, member.uid)}>
                yes
              </RetroButton>
            </div>
          </BoxLayer>
        )}
      </AnimatePresence>
    </>
  );
}

export default Member;
