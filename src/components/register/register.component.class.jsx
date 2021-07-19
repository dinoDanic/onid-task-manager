import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, registerUserFb } from "../../firebase/firebase.utils";

import Input from "../retro/input/input.component";
import RetroButton from "../retro/button/retro-button.component";

import { setCurrentUser } from "../../redux/user/user.actions";

import "./register.styles.scss";
import Loading from "../retro/loading/loading.component";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoading, setShowLoading] = useState(false);
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
      setShowLoading(true);
      await registerUserFb(user, userName);
      setShowLoading(false);
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
    <div className="register">
      {showLoading && <Loading />}
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
      <div className="register__error">
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default Register;
