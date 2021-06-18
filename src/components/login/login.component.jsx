import React from "react";
import { LoginWithGoogle } from "../../firebase/firebase.utils";

import RetroButton from "../retro/button/retro-button.component";
import Input from "../retro/input/input.component";

import { LoginContainer } from "./login.styles";

function Login() {
  return (
    <LoginContainer>
      <h2>Login</h2>
      <Input placeholder="username" />
      <Input placeholder="password" />
      <RetroButton style={{ width: "100%" }}>Login</RetroButton>
      <hr />
      <div onClick={() => LoginWithGoogle()}>
        <RetroButton style={{ width: "100%" }}>Login with Google</RetroButton>
      </div>
    </LoginContainer>
  );
}

export default Login;
