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
    console.log("chekc space");
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
    // get all users
    let users = [];
    const userRef = db.collection("users");
    const usersQuery = await userRef.get();
    usersQuery.forEach((user) => {
      users.push(user.data());
    });
    dispatch(setUsers(users));
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
