import React from "react";
import { LoginWithGoogle, auth } from "../../firebase/firebase.utils";

import RetroButton from "../retro/button/retro-button.component";
import Input from "../retro/input/input.component";

import "./login.styles.scss";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
    };
    this.loginWithEmailAndPassword = this.loginWithEmailAndPassword.bind(this);
  }

  loginWithEmailAndPassword() {
    const { email, password } = this.state;
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      var errorMessage = error.message;
      this.setState({ errorMessage: errorMessage });
    });
  }
  render() {
    return (
      <div className="login">
        <h2>Login</h2>
        <div onChange={(e) => this.setState({ email: e.target.value })}>
          <Input placeholder="email" type="email" />
        </div>
        <div onChange={(e) => this.setState({ password: e.target.value })}>
          <Input placeholder="password" type="password" />
        </div>
        <RetroButton
          onClick={() => this.loginWithEmailAndPassword()}
          style={{ width: "100%" }}
        >
          Login
        </RetroButton>
        <hr />
        <div onClick={() => LoginWithGoogle()}>
          <RetroButton style={{ width: "100%" }}>Login with Google</RetroButton>
        </div>
        <div className="login__error">
          <p>{this.state.errorMessage}</p>
        </div>
      </div>
    );
  }
}

export default Login;
