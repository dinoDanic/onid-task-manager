import React from "react";
import RetroButton from "../retro/button/retro-button.component";

import "./menu-bar.styles.scss";

const MenuBar = () => {
  return (
    <div className="menuBar">
      <div className="menuBar__logo">
        <h1>onid</h1>
      </div>
      <ul>
        <li>
          <RetroButton>Login</RetroButton>
        </li>
        <li>
          <RetroButton>Register</RetroButton>
        </li>
        <li>
          <RetroButton>Abotu</RetroButton>
        </li>
        <li>
          <RetroButton>Feauters</RetroButton>
        </li>
      </ul>
    </div>
  );
};

export default MenuBar;
