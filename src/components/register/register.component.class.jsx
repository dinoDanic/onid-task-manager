import React from "react";
import { auth, db } from "../../firebase/firebase.utils";

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
    this.register = this.register.bind(this);
  }

  register(e) {
    e.preventDefault();
    const { email, password, repeatPassword } = this.state;
    if (password !== repeatPassword) {
      this.setState({ errorMessage: "passwords don't match" });
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((regUser) => {
        console.log(regUser.user.uid);
        /*  db.collection("users").doc(regUser).add({
          userName: this.userName,
          imageUrl:
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a5900ce8-b6a5-4575-a9c3-dfcaab76d1eb/d4n7jp8-32d848b5-f48c-46ec-acfb-c72595e173b5.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E1OTAwY2U4LWI2YTUtNDU3NS1hOWMzLWRmY2FhYjc2ZDFlYlwvZDRuN2pwOC0zMmQ4NDhiNS1mNDhjLTQ2ZWMtYWNmYi1jNzI1OTVlMTczYjUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1TpIeeQ6fo6etC8CKLgIBrjEIiWXz37b81lKZcmiA9c",
        }); */
      })
      .catch((error) => {
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
          <div onChange={(e) => this.setState({ userName: e.target.value })}>
            <Input type="text" placeholder="User name" />
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
