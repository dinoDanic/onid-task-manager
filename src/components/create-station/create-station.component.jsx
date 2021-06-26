import React, { useState } from "react";

import "./create-station.styles.scss";

import BoxLayer from "../retro/box-layer/box-layer.component";
import RetroButton from "../retro/button/retro-button.component";
import Step1 from "./step1/step1.component";
import Step2 from "./step2/step2.component";

const CreateStation = ({ setCreateStation }) => {
  const [stationName, setStationName] = useState("Enter Station name");

  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  return (
    <div className="createStation">
      <BoxLayer setLayer={setCreateStation}>
        <div className="cs__createPop">
          {step1 && (
            <Step1
              stationName={stationName}
              setStationName={setStationName}
              setStep1={setStep1}
              setStep2={setStep2}
            />
          )}
          {step2 && <Step2 setStep1={setStep1} setStep2={setStep2} />}
        </div>
      </BoxLayer>
    </div>
  );
};

export default CreateStation;
