import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSpaceData } from "../../redux/space/space.selectors";

import {
  HomeContainer,
  Content,
  Spaces,
  SubTitle,
  Stations,
} from "./home.styles";
import { Titleh2 } from "../../theme.styles";

import Box from "../../components/retro/box/box.component";
import NoSpaceData from "../../components/noSpaceData/no-space-data.component";
import SpaceData from "../../components/spaceData/space-data.component";

function Home({ spaceData }) {
  return (
    <HomeContainer>
      {/* <CreateSpace></CreateSpace> */}
      <Content>
        <Spaces>
          <Titleh2>Your Space</Titleh2>
          <SubTitle>Space in the account that you are a member of</SubTitle>
          <Box>{spaceData ? <SpaceData /> : <NoSpaceData />}</Box>
        </Spaces>
        <Stations>
          <Titleh2>Stations</Titleh2>
          <SubTitle></SubTitle>
          <Box>content</Box>
        </Stations>
      </Content>
    </HomeContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  spaceData: selectSpaceData,
});

export default connect(mapStateToProps)(Home);
