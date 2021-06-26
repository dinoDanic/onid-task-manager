import React, { useState } from "react";

import "./create-station.styles.scss";

import BoxLayer from "../retro/box-layer/box-layer.component";
import RetroButton from "../retro/button/retro-button.component";
import Step1 from "./step1/step1.component";
import Step2 from "./step2/step2.component";
import Step3 from "./step3/step3.component";

const CreateStation = ({ setCreateStation }) => {
  const [stationName, setStationName] = useState("Enter Station name");
  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
  });

  return (
    <div className="createStation">
      <BoxLayer setLayer={setCreateStation}>
        <div className="cs__createPop">
          {steps.step1 && (
            <Step1
              stationName={stationName}
              setStationName={setStationName}
              setSteps={setSteps}
            />
          )}
          {steps.step2 && <Step2 setSteps={setSteps} />}
          {steps.step3 && <Step3 setSteps={setSteps} />}
        </div>
      </BoxLayer>
    </div>
  );
};

export default CreateStation;
