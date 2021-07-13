import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./avatar.styles.scss";

const Avatar = ({ src }) => (
  <div className="avatar">
    {src ? <img alt="" src={src} /> : <FontAwesomeIcon icon={faUser} />}
  </div>
);

export default Avatar;
