import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, registerUserFb } from "../../firebase/firebase.utils";

import Input from "../retro/input/input.component";
import RetroButton from "../retro/button/retro-button.component";

import { setCurrentUser } from "../../redux/user/user.actions";

import { RegisterContainer, Error } from "./register.styles";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const signInUrl = history.location.pathname.split("/")[1];

  const register = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrorMessage("passwords don't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(userName);
      await registerUserFb(user, userName);
      dispatch(setCurrentUser(user));
      if (signInUrl === "signin") {
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <RegisterContainer>
      <h2>Register</h2>
      <form>
        <div onChange={(e) => setEmail(e.target.value)}>
          <Input type="email" placeholder="email" />
        </div>
        <div onChange={(e) => setUserName(e.target.value)}>
          <Input type="text" placeholder="Username" />
        </div>
        <div onChange={(e) => setPassword(e.target.value)}>
          <Input type="password" placeholder="Password" />
        </div>
        <div onChange={(e) => setRepeatPassword(e.target.value)}>
          <Input type="password" placeholder="Repeat Password" />
        </div>
        <RetroButton
          onClick={(e) => register(e)}
          type="submit"
          style={{ width: "100%" }}
        >
          Register
        </RetroButton>
      </form>
      <Error>
        <p>{errorMessage}</p>
      </Error>
    </RegisterContainer>
  );
};

export default Register;
