import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/firebase.utils";
import { motion } from "framer-motion";

import Avatar from "../../components/retro/avatar/avatar.component";
import SpaceFly from "../../components/space-fly/space-fly.component";

import { setSpaceData, removeSpaceData } from "../../redux/space/space.actions";
import { setLoading } from "../../redux/history/history.actions";
import { setOpen } from "../../redux/user/user.actions";

import "./space.styles.scss";
import UserProfile from "../../components/user-profile/user-profile.component";

const Space = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const spaceId = useSelector((state) => state.history.spaceId);
  const open = useSelector((state) => state.user.currentUser.open);
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("space")
      .where("members", "array-contains", currentUser.uid)
      /* .orderBy("created", "asc") */
      .onSnapshot((snapShot) => {
        if (!snapShot.empty) {
          let shots = [];
          snapShot.forEach((doc) => {
            shots.push(doc.data());
          });
          dispatch(setSpaceData(shots));
        }
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000);
      });
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    db.collection("users")
      .doc(currentUser.uid)
      .onSnapshot((userDatat) => {
        const getOpen = userDatat.data().open;
        if (getOpen) {
          dispatch(setOpen(true));
        } else {
          dispatch(setOpen(false));
        }
      });
  }, []);

  return (
    <motion.div
      className="space"
      animate={{ paddingTop: open ? "20px" : "40px" }}
    >
      <div className="space__fly">
        <SpaceFly />
      </div>
      <div className="space__user">
        <UserProfile currentUser={currentUser} />
      </div>
    </motion.div>
  );
};

export default Space;
