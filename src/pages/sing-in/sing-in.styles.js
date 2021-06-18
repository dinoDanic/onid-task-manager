import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import { mainColor } from "../../theme.styles";

export const SignInContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  height: 400px;
  overflow: hidden;
  padding: 30px;
  width: 300px;
  position: relative;
`;

export const NoAccount = styled.div`
  position: absolute;
  bottom: 0;
  cursor: pointer;
  display: flex;

  p {
    text-align: center;
  }
`;

const ContentStyle = css`
  width: 240px;
  min-height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  input {
    width: 240px;
  }
  h2 {
    margin-bottom: 10px;
    text-align: center;
  }
`;
export const LoginContent = styled.div`
  margin-bottom: 60px;
  ${ContentStyle};
`;
export const RegisterContent = styled.div`
  margin-bottom: 60px;
  ${ContentStyle};
`;

export const Scroll = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const QuestionBold = styled.span`
  font-weight: 700;
  ${mainColor}
`;
