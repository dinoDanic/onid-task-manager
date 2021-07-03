import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./modules.styles.scss";

import RetroButton from "../retro/button/retro-button.component";
import BoxLayer from "../retro/box-layer/box-layer.component";
import ModuleList from "./module-list/module-list.component";

const Modules = ({ currentStationId, currentSpaceId }) => {
  const moduleData = useSelector((state) => state.space.moduleData);
  const [moduleWindow, setModuleWindow] = useState(false);
  return (
    <div className="modules">
      <div className="modules__button">
        <RetroButton
          mode="flat2"
          color="info"
          onClick={() => setModuleWindow(!moduleWindow)}
        >
          Moduels
        </RetroButton>
      </div>
      {moduleWindow && (
        <div className="modules__win">
          <BoxLayer setLayer={setModuleWindow}>
            {moduleData?.map((module) => {
              return (
                <ModuleList
                  key={module.name}
                  module={module}
                  modules={moduleData}
                  currentStationId={currentStationId}
                  currentSpaceId={currentSpaceId}
                />
              );
            })}
          </BoxLayer>
        </div>
      )}
    </div>
  );
};

export default Modules;
