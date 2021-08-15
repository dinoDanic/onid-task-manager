import React, { useState } from "react";
import { loginWithEmailAndPassword } from "../../firebase/firebase.utils";
import RetroButton from "../retro/button/retro-button.component";

import "./create-demo.styles.scss";

import {
  createDemoUser,
  createDummyUsers,
  createDummySpace,
  createDummyStation,
  createDummyTasks,
} from "./utils";

const CreateDemo = () => {
  const [startCreate, setStartCreate] = useState(false);
  const [demoUser, setDemoUser] = useState(false);
  const [createDummys, setCreateDummys] = useState(false);
  const [createSpace, setCreateSpace] = useState(false);
  const [createStation, setCreateStation] = useState(false);
  const [createTasks, setCreateTasks] = useState(false);
  const [logIn, setLogIn] = useState(false);
  // prvo registriraj usera demo@demo.com
  // create users

  const handleCreateDemo = async () => {
    setStartCreate(true);
    await createDemoUser();
    setDemoUser(true);
    await createDummyUsers();
    setCreateDummys(true);
    await createDummySpace();
    setCreateSpace(true);
    await createDummyStation();
    setCreateStation(true);
    await createDummyTasks();
    setCreateTasks(true);
    setLogIn(true);
    setTimeout(() => {
      loginWithEmailAndPassword("demo@demo.com", "111111");
    }, 1500);
  };

  return (
    <div className="createDemo">
      <h2>Create Demo </h2>
      {startCreate ? (
        <>
          <br />
          <p>Create Demo User {demoUser ? "✅" : "⬜"}</p>
          <p>Create Dummy Users {createDummys ? "✅" : "⬜"}</p>
          <p>Create Dummy Space {createSpace ? "✅" : "⬜"} </p>
          <p>Create Dummy Station {createStation ? "✅" : "⬜"} </p>
          <p>Create Tasks {createTasks ? "✅" : "⬜"} </p>
          <br />
          <p style={{ textAlign: "center", fontSize: "16px" }}>
            {logIn && "All done 🤘 logging in"}
          </p>
        </>
      ) : (
        <div className="createDemo__button">
          <RetroButton onClick={() => handleCreateDemo()}>
            Create Demo
          </RetroButton>
        </div>
      )}
    </div>
  );
};

export default CreateDemo;
