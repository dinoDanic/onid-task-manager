import React, { useState, useEffect } from "react";

import "./create-station.styles.scss";

import { createNewStation2 } from "../../firebase/firebase.utils";

import BoxLayer from "../retro/box-layer/box-layer.component";
import RetroButton from "../retro/button/retro-button.component";
import Step1 from "./step1/step1.component";
import Step2 from "./step2/step2.component";
import Step3 from "./step3/step3.component";

const CreateStation = ({ setCreateStation, activeSpaceId }) => {
  const [stationName, setStationName] = useState("Enter Station name");
  const [force, setForce] = useState(0);
  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
  });
  const [statusType, setStatusType] = useState({
    "to do": {
      id: "to do",
      name: "to do",
      taskIds: ["1", "2"],
      color: "#34b5e4",
    },
    stuck: {
      id: "stuck",
      name: "stuck",
      taskIds: [],
      color: "#e2445c",
    },
    done: {
      id: "done",
      name: "done",
      taskIds: [],
      color: "#05ce91",
    },
  });

  const [statusOrder, setStatusOrder] = useState(["to do", "stuck", "done"]);

  useEffect(() => {
    let keys = Object.keys(statusType);
    setStatusOrder(keys);
    console.log(statusOrder);
  }, [statusType, setStatusType, force, setForce]);

  const [modules, setModules] = useState([
    { name: "CreatedBy", active: true, icon: "faUser" },
    { name: "Assign", active: true, icon: "faUserCheck" },
    { name: "Priority", active: true, icon: "faExclamationCircle" },
    { name: "Status", active: true, icon: "faInfoCircle" },
    { name: "CreatedDate", active: true, icon: "faCalendarCheck" },
    { name: "Deadling", active: true, icon: "faCalendarAlt" },
  ]);

  const handleCreate = () => {
    createNewStation2(activeSpaceId, stationName, statusType, statusOrder);
  };

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
          {steps.step2 && (
            <Step2
              setSteps={setSteps}
              statusType={statusType}
              setStatusType={setStatusType}
            />
          )}
          {steps.step3 && (
            <>
              <Step3
                setSteps={setSteps}
                modules={modules}
                setModules={setModules}
                setForce={setForce}
                force={force}
              />

              <div className="cs__create-btn">
                <RetroButton
                  mode="gray"
                  onClick={() =>
                    setSteps({
                      step3: false,
                      step2: true,
                    })
                  }
                >
                  back
                </RetroButton>
                <RetroButton onClick={() => handleCreate()}>create</RetroButton>
              </div>
            </>
          )}
        </div>
      </BoxLayer>
    </div>
  );
};

export default CreateStation;
