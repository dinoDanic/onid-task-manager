import styled from "styled-components";
import { DangerColor } from "../../theme.styles";

export const LoginContainer = styled.div`
  height: 100%;
  position: relative;
`;

export const Error = styled.div`
  margin-top: 10px;
  p {
    ${DangerColor}
  }
`;
