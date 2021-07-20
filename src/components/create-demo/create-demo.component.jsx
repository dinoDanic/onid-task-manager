import React from "react";
import { loginWithEmailAndPassword } from "../../firebase/firebase.utils";
import RetroButton from "../retro/button/retro-button.component";
import RetroInput from "../retro/input/input.component";

import "./create-demo.styles.scss";

const CreateDemo = () => {
  return (
    <div className="createDemo">
      <h2>Login Demo</h2>
      <br />
      <form onSubmit={(e) => e.preventDefault()}>
        <RetroInput value="buko@onid.com" placeholder="Buko" />
        <RetroInput value="111111" placeholder="password" type="password" />
        <div className="createDemo__button">
          <RetroButton
            onClick={() => loginWithEmailAndPassword("buko@onid.com", "111111")}
          >
            Login
          </RetroButton>
        </div>
      </form>
    </div>
  );
};

export default CreateDemo;
