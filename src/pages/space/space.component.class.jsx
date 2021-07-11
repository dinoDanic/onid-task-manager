import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../firebase/firebase.utils";
import { createStructuredSelector } from "reselect";

import Avatar from "../../components/retro/avatar/avatar.component";
import SpaceFly from "../../components/space-fly/space-fly.component";

import { setSpaceData, removeSpaceData } from "../../redux/space/space.actions";
import { setUsers } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./space.styles.scss";

const Space = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("space")
      .where("members", "array-contains", currentUser.uid)
      .orderBy("created", "asc")
      .onSnapshot((snapShot) => {
        if (!snapShot.empty) {
          let shots = [];
          snapShot.forEach((doc) => {
            shots.push(doc.data());
          });
          dispatch(setSpaceData(shots));
        }
      });
  }, [currentUser]);

  useEffect(async () => {
    console.log("setting all users");
    db.collection("users").onSnapshot((usersData) => {
      let users = [];
      usersData.forEach((userData) => {
        users.push(userData.data());
      });
      console.log("db.users updated, dispathing users to redux");
      dispatch(setUsers(users));
    });
  }, []);

  function handleLogout() {
    removeSpaceData();
    auth.signOut();
  }

  return (
    <div className="space">
      <div className="space__fly">
        <SpaceFly />
      </div>
      <div className="space__user" onClick={() => handleLogout()}>
        <Avatar src={currentUser.image} />
      </div>
    </div>
  );
};

export default Space;
