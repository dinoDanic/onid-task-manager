import React from "react";
import { useSelector } from "react-redux";

import "./home.styles.scss";

import NoSpaceData from "../../components/noSpaceData/no-space-data.component";
import SpaceData from "../../components/spaceData/space-data.component";
import SectionBox from "../../components/section-box/section-box.component";
import FavoriteStations from "../../components/favorite-stations/favorite-stations.component";
import AssignedTasks from "../../components/assigned-tasks/assigned-tasks.component";
import WelcomeHome from "../../components/welcome-home/welcome-home.component";

const Home = () => {
  const spaceData = useSelector((state) => state.space.spaceData);

  return (
    <div className="home">
      <div className="home__welcomeHome">
        <WelcomeHome />
      </div>
      <div className="home__content">
        <SectionBox title="🚀 Your Space" subTitle="Space you are member of">
          {spaceData.length !== 0 ? <SpaceData /> : <NoSpaceData />}
        </SectionBox>
        <SectionBox
          title="⭐ Favorite Stations"
          subTitle="Active Favorite stations"
        >
          <div className="home__favorite">
            <div className="home__favoriteStations">
              <FavoriteStations />
            </div>
          </div>
        </SectionBox>
        <SectionBox
          title="✅ My Tasks"
          subTitle="Tasks that are Assinged to you"
        >
          <AssignedTasks />
        </SectionBox>
      </div>
    </div>
  );
};

export default Home;
