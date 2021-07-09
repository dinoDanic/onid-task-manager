import React from "react";

import { useActiveSpaceData } from "../../hooks/useActiveSpaceData.hook";

import DockHeader from "../../components/dock-header/dock-header.component";
import Box from "../../components/retro/box/box.component";
import RecentStations from "../../components/recent-stations/recent-stations.component";
import Members from "../../components/members/members.component";

import "./dock-station.styles.scss";

const DockStation = () => {
  const activeSpaceData = useActiveSpaceData();

  return (
    <div className="dockStation">
      {activeSpaceData && (
        <div>
          <DockHeader activeSpaceData={activeSpaceData} />
          <div className="ds__content ">
            <div className="ds__recentStations ds__item">
              <h2>Recent Stations</h2>
              <Box>
                <RecentStations activeSpaceData={activeSpaceData} />
              </Box>
            </div>
            <div className="ds__members ds__item">
              <h2>Members</h2>
              <Box>
                <Members activeSpaceData={activeSpaceData} />
              </Box>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DockStation;
