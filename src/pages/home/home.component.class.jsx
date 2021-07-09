import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSpaceData } from "../../redux/space/space.selectors";
import { db } from "../../firebase/firebase.utils";

import "./home.styles.scss";

import NoSpaceData from "../../components/noSpaceData/no-space-data.component";
import SpaceData from "../../components/spaceData/space-data.component";
import SectionBox from "../../components/section-box/section-box.component";
import FavoriteStations from "../../components/favorite-stations/favorite-stations.component";

const Home = () => {
  const spaceData = useSelector((state) => state.space.spaceData);
  const favoriteStations = useSelector(
    (state) => state.user.currentUser.favoriteStations
  );
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    let list = [];
  }, [favoriteStations]);

  return (
    <div className="home">
      <div className="home__content">
        <SectionBox title="Your Space" subTitle="Space you are member of">
          {spaceData.length !== 0 ? <SpaceData /> : <NoSpaceData />}
        </SectionBox>
        <SectionBox
          title="Favorite Stations"
          subTitle="Active Favorite stations
      "
        >
          <div className="home__recent">
            <div className="home__recentStations">
              <FavoriteStations spaces={spaces} />
            </div>
          </div>
        </SectionBox>
      </div>
    </div>
  );
};

export default Home;
