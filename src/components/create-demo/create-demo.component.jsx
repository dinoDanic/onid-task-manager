import React, { useState } from "react";
import { db, fieldValue, registerUserFb } from "../../firebase/firebase.utils";
import { loginWithEmailAndPassword } from "../../firebase/firebase.utils";
import RetroButton from "../retro/button/retro-button.component";
import RetroInput from "../retro/input/input.component";

import "./create-demo.styles.scss";

import { names, dummySpaceNames, dummySpaceColor, dummyImages } from "./users";

const CreateDemo = () => {
  const [showSettings, setShowSettings] = useState(true);
  // prvo registriraj usera demo@demo.com
  // create users
  const createDummyUsers = () => {
    for (let u = 0; u < 5; u++) {
      db.collection("users")
        .doc(`dummy${u}`)
        .set({
          userName: names[u].name,
          uid: names[u].name,
          email: `${names[u].name.toLowerCase()}@onid-tm.com`,
          assignedTasks: [],
          favoriteStations: [],
          imageUrl: dummyImages[u].imageUrl,
          open: true,
        });
    }
  };
  const creatDummySpace = async () => {
    const findUser = await db
      .collection("users")
      .where("email", "==", "demo@demo.com")
      .get();
    if (!findUser) {
      alert("no user, registriaj prvo");
      return;
    }
    findUser.forEach((user) => {
      for (let s = 0; s < 3; s++) {
        db.collection("space")
          .doc(`dummySpace${s}`)
          .set({
            name: dummySpaceNames[s].name,
            admin: null,
            color: dummySpaceColor[s].color,
            admin: user.data().uid,
            members: [
              "Bleki",
              "Lun",
              "Melita",
              "Nina",
              "Dino",
              user.data().uid,
            ],
            created: fieldValue.serverTimestamp(),
            description: "Add description",
            spaceId: `dummySpace${s} `,
          });
      }
    });
  };
  return (
    <div className="createDemo">
      {showSettings && (
        <>
          <h2>Create Demo</h2>
          <br />
          <RetroButton onClick={() => createDummyUsers()}>
            Create Dummys
          </RetroButton>
          <RetroButton onClick={() => creatDummySpace()}>
            Create Space
          </RetroButton>
        </>
      )}
      <h2>Login Demo</h2>
      <br />
      <form onSubmit={(e) => e.preventDefault()}>
        <RetroInput value="demo@demo.com" placeholder="" />
        <RetroInput value="111111" placeholder="password" type="password" />
        <div className="createDemo__button">
          <RetroButton
            onClick={() => loginWithEmailAndPassword("demo@demo.com", "111111")}
          >
            Login
          </RetroButton>
        </div>
      </form>
    </div>
  );
};

export default CreateDemo;
