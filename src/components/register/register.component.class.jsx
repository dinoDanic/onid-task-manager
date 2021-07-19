import React from "react";
import { auth, registerUserFb, db } from "../../firebase/firebase.utils";

import Input from "../retro/input/input.component";
import RetroButton from "../retro/button/retro-button.component";

import { RegisterContainer, Error } from "./register.styles";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      userName: "",
      repeatPassword: "",
      errorMessage: "",
    };
  }

  register = async (e) => {
    e.preventDefault();
    const { email, password, repeatPassword, userName } = this.state;
    if (password !== repeatPassword) {
      this.setState({ errorMessage: "passwords don't match" });
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      await registerUserFb(user, userName);
    } catch (error) {
      console.log(error.emssage);
    }
  };

  render() {
    return (
      <RegisterContainer>
        <h2>Register</h2>
        <form>
          <div onChange={(e) => this.setState({ email: e.target.value })}>
            <Input type="email" placeholder="email" />
          </div>
          <div onChange={(e) => this.setState({ userName: e.target.value })}>
            <Input type="text" placeholder="Username" />
          </div>
          <div onChange={(e) => this.setState({ password: e.target.value })}>
            <Input type="password" placeholder="Password" />
          </div>
          <div
            onChange={(e) => this.setState({ repeatPassword: e.target.value })}
          >
            <Input type="password" placeholder="Repeat Password" />
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
