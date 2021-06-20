import styled, { css } from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export const CreateSpace = styled.div`
  background: white;
  height: 40px;
`;

const sections = css`
  margin-bottom: 50px;
`;
export const Spaces = styled.div`
  ${sections}
`;
export const Stations = styled.div`
  ${sections}
`;

export const SubTitle = styled.p`
  margin-bottom: 15px;
`;

export const Content = styled.div`
  padding: 40px 80px;
`;
