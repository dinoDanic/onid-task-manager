import React, { useState } from "react";
import { auth } from "../../firebase/firebase.utils";

import "./user-profile.styles.scss";

import Avatar from "../retro/avatar/avatar.component";

import BoxLayer from "../retro/box-layer/box-layer.component";
import RetroInput from "../retro/input/input.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import RetroButton from "../retro/button/retro-button.component";

const UserProfile = ({ currentUser }) => {
  const [showPage, setShowPage] = useState(false);

  function handleLogout() {
    auth.signOut();
  }
  return (
    <div className="userProfile">
      <div className="userProfile__icon" onClick={() => setShowPage(!showPage)}>
        <Avatar src={currentUser.imageUrl} />
      </div>
      {showPage && (
        <BoxLayer setLayer={setShowPage}>
          <div className="userProfile__page">
            <div className="userProfile__heading">
              <h2>My Profile</h2>
            </div>
            <div className="userProfile__info">
              <div className="userProfile__info-avatar">
                <Avatar src={currentUser.imageUrl} />
              </div>
              <div className="userProfile__info-user">
                <div className="userProfile__info-row">
                  <p>Full Name</p>
                  <RetroInput value={currentUser.userName} />
                  <div className="userProfile__logout">
                    <RetroButton onClick={() => handleLogout()}>
                      <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
                      Logout
                    </RetroButton>
                  </div>
                </div>
                <div className="userProfile__info-row">
                  <p>Email</p>
                  <RetroInput value={currentUser.email} />
                </div>
              </div>
            </div>
          </div>
        </BoxLayer>
      )}
    </div>
  );
};

export default UserProfile;
