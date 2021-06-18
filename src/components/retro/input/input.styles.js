import styled from "styled-components";

export const InputContainer = styled.input`
  border-radius: 5px;
  border: none;
  box-shadow: inset 0px -4px 0 0 rgba(0, 0, 0, 0.3);
  height: 36px;
  width: 100px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  border-left: 1px solid rgba(0, 0, 0, 0.3);
  padding: 10px;
  outline: none;
  margin-bottom: 10px;
  width: 100%;
  transition: 0.2s;
  &:focus {
    box-shadow: inset 0px -4px 0 0 rgba(0, 0, 0, 0.5);
    transform: scale(1.02);
  }
`;
