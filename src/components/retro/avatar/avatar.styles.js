import styled from "styled-components";
import { motion } from "framer-motion";

export const AvatarC = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  cursor: pointer;
  overflow: hidden;
`;

export const Img = styled.img`
  width: 100%;
`;
