import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSpaceData } from "../../redux/space/space.selectors";

import "./home.styles.scss";

import NoSpaceData from "../../components/noSpaceData/no-space-data.component";
import SpaceData from "../../components/spaceData/space-data.component";
import SectionBox from "../../components/section-box/section-box.component";
import FavoriteStations from "../../components/favorite-stations/favorite-stations.component";

class Home extends React.Component {
  constructor() {
    super();
  }
  componentDidUpdate(prevProps) {
    if (this.props.spaceData !== prevProps.spaceData) {
      console.log("update");
    }
  }
  render() {
    return (
      <div className="home">
        <div className="home__content">
          <SectionBox title="Your Space" subTitle="Space you are member of">
            {this.props.spaceData.length !== 0 ? (
              <SpaceData />
            ) : (
              <NoSpaceData />
            )}
          </SectionBox>
          <SectionBox
            title="Favorite Stations"
            subTitle="Recent Stations of your favorite Space"
          >
            <div className="home__recent">
              <div className="home__recentStations">
                <FavoriteStations />
              </div>
            </div>
          </SectionBox>
        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  spaceData: selectSpaceData,
});

export default connect(mapStateToProps)(Home);
