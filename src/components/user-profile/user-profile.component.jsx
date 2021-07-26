import React, { useState, useEffect } from "react";
import { auth, updateUser, storage } from "../../firebase/firebase.utils";

import "./user-profile.styles.scss";

import Avatar from "../retro/avatar/avatar.component";

import BoxLayer from "../retro/box-layer/box-layer.component";
import RetroInput from "../retro/input/input.component";
import RetroButton from "../retro/button/retro-button.component";
import Loading from "../retro/loading/loading.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const UserProfile = ({ currentUser }) => {
  const [showPage, setShowPage] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    userName: currentUser.userName,
    imageUrl: currentUser.imageUrl,
  });

  useEffect(() => {}, [currentUser]);

  function handleLogout() {
    auth.signOut();
  }

  const handleSave = () => {
    try {
      updateUser(currentUser.uid, newUser);
    } catch (error) {
      console.log(error.message);
    } finally {
      currentUser.userName = newUser.userName;
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref("profilePictures");
    const fileRef = storageRef.child(file.name);
    setShowLoading(true);
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL();
    const newUser2 = {
      imageUrl: fileUrl,
    };
    updateUser(currentUser.uid, newUser2);
    setNewUser({ ...newUser, imageUrl: fileUrl });
    setShowLoading(false);
  };

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
                {showLoading && <Loading />}
                <Avatar src={newUser.imageUrl} />
                <input
                  type="file"
                  className="userProfile__info-input"
                  onChange={(e) => handleUploadImage(e)}
                />
              </div>
              <div className="userProfile__info-user">
                <div className="userProfile__info-row">
                  <p>Full Name</p>
                  <RetroInput
                    value={newUser.userName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, userName: e.target.value })
                    }
                  />
                  <div className="userProfile__logout">
                    <RetroButton onClick={() => handleLogout()}>
                      <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
                      Logout
                    </RetroButton>
                  </div>
                </div>
                <div className="userProfile__info-row">
                  <p>Email</p>
                  <div className="userProfile__info-email">
                    <p>{currentUser.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="userProfile__buttons">
              <div className="userProfile__saveChanges">
                <RetroButton
                  mode={newUser.userName === currentUser.userName && "cancel"}
                  onClick={() => handleSave()}
                >
                  Save Changes
                </RetroButton>
              </div>
            </div>
          </div>
        </BoxLayer>
      )}
    </div>
  );
};

export default UserProfile;
