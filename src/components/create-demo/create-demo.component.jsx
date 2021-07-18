import React from "react";
import RetroButton from "../retro/button/retro-button.component";
import RetroInput from "../retro/input/input.component";

import "./create-demo.styles.scss";

const CreateDemo = () => {
  return (
    <div className="createDemo">
      <h2>Login Demo</h2>
      <br />
      <RetroInput value="demo@demo.com" placeholder="username" />
      <RetroInput value="111111" placeholder="password" type="password" />
      <div className="createDemo__button">
        <RetroButton>Login</RetroButton>
      </div>
    </div>
  );
};

export default CreateDemo;
