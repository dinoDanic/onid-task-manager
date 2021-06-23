import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSpaceData } from "../../redux/space/space.selectors";

import "./home.styles.scss";

import Box from "../../components/retro/box/box.component";
import NoSpaceData from "../../components/noSpaceData/no-space-data.component";
import SpaceData from "../../components/spaceData/space-data.component";
import SectionBox from "../../components/section-box/section-box.component";
import RecentStations from "../../components/recent-stations/recent-stations.component";

function Home({ spaceData }) {
  return (
    <div className="home">
      {/* <CreateSpace></CreateSpace> */}
      <div className="home__content">
        <SectionBox
          title="Your Space"
          subTitle="Space in the account that you are a member of"
        >
          {spaceData ? <SpaceData /> : <NoSpaceData />}
        </SectionBox>
        <SectionBox
          title="Recent Stations"
          subTitle="Recent Station of your main Space"
        >
          <div className="home__recent">
            <div className="home__recentStations">
              <RecentStations />
            </div>
            <div className="home__something">
              <p>idea?</p>
            </div>
          </div>
        </SectionBox>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  spaceData: selectSpaceData,
});

export default connect(mapStateToProps)(Home);
