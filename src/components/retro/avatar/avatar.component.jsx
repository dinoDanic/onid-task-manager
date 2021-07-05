import React from "react";

import { AvatarC, Img } from "./avatar.styles";

const Avatar = ({ src }) => (
  <AvatarC>
    <Img src={src} />
  </AvatarC>
);

export default Avatar;
