import React from "react";

import useActiveSpaceData from "../../hooks/useActiveSpaceData";

import Box from "../../components/retro/box/box.component";

import "./dock-station.styles.scss";

const DockStation = () => {
  const activeSpaceData = useActiveSpaceData();

  return (
    <div className="dockStation">
      {activeSpaceData && (
        <div>
          <div className="ds__header">
            <h2>{activeSpaceData.name}</h2>
            <p>description</p>
          </div>
          <div className="ds__content ">
            <div className="ds__recentStations ds__item">
              <h2>Recent Stations</h2>
              <Box></Box>
            </div>
            <div className="ds__members ds__item">
              <h2>Members</h2>
              <Box></Box>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DockStation;
