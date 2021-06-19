import styled from "styled-components";
import { DangerColor } from "../../theme.styles";

export const RegisterContainer = styled.div`
  height: 100%;
`;

export const Error = styled.div`
  margin-top: 10px;
  p {
    ${DangerColor}
  }
`;
