import React from "react";

import { AvatarC, Img } from "./avatar.styles";

const Avatar = ({ src }) => (
  <AvatarC whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Img src={src} />
  </AvatarC>
);

export default Avatar;
