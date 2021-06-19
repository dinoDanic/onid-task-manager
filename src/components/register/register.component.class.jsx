import React from "react";
import { auth } from "../../firebase/firebase.utils";

import Input from "../retro/input/input.component";
import RetroButton from "../retro/button/retro-button.component";

import { RegisterContainer, Error } from "./register.styles";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      repeatPassword: "",
      errorMessage: "",
    };
    this.register = this.register.bind(this);
  }

  register(e) {
    e.preventDefault();
    const { email, password, repeatPassword } = this.state;
    if (password !== repeatPassword) {
      this.setState({ errorMessage: "passwords don't match" });
      return;
    }
    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      var errorMessage = error.message;
      this.setState({ errorMessage: errorMessage });
    });
  }

  render() {
    return (
      <RegisterContainer>
        <h2>Register</h2>
        <form>
          <div onChange={(e) => this.setState({ email: e.target.value })}>
            <Input type="email" placeholder="email" />
          </div>
          <div onChange={(e) => this.setState({ password: e.target.value })}>
            <Input type="password" placeholder="password" />
          </div>
          <div
            onChange={(e) => this.setState({ repeatPassword: e.target.value })}
          >
            <Input type="password" placeholder="repeat password" />
          </div>
          <RetroButton
            onClick={(e) => this.register(e)}
            type="submit"
            style={{ width: "100%" }}
          >
            Register
          </RetroButton>
        </form>
        <Error>
          <p>{this.state.errorMessage}</p>
        </Error>
      </RegisterContainer>
    );
  }
}

export default Register;
