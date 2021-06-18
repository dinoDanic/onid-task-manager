import React from "react";
import { auth } from "../../firebase/firebase.utils";

import Input from "../retro/input/input.component";
import RetroButton from "../retro/button/retro-button.component";

import { RegisterContainer } from "./register.styles";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <RegisterContainer>
        <h2>Register</h2>
        <form>
          <div onChange={(e) => this.setState({ username: e.target.value })}>
            <Input type="email" placeholder="email" />
          </div>
          <div onChange={(e) => this.setState({ password: e.target.value })}>
            <Input type="password" placeholder="password" />
          </div>
          <div>
            <Input type="password" placeholder="repeat password" />
          </div>
          <RetroButton type="submit" style={{ width: "100%" }}>
            Register
          </RetroButton>
        </form>
      </RegisterContainer>
    );
  }
}

export default Register;
