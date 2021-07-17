import React, { useState, useRef } from "react";

import RetroButton from "../../retro/button/retro-button.component";
import RetroInput from "../../retro/input/input.component";
import Status from "./status/status.component";

import "./step2.styles.scss";

const Step2 = ({ setSteps, setStatusType, statusType }) => {
  const statusTypeValues = Object.values(statusType);
  const [newStatusName, setNewStatusName] = useState("Add new");
  const [force, setForce] = useState(0);

  const inputRef = useRef();

  const addNewType = (e) => {
    e.preventDefault();
    console.log(statusType);
    let newStatus = {
      ...statusType,
      [newStatusName]: {
        name: newStatusName,
        id: newStatusName,
        color: "#FDAB3D",
        taskIds: [],
        open: true,
      },
    };

    setStatusType(newStatus);
    setNewStatusName("Add new");
    inputRef.current.value = "";
  };

  return (
    <div className="step2">
      <h2>Edit Status types for your Tasks</h2>
      <div className="step2__statusContainer">
        <div className="step2__statusType">
          <div className="step2__types">
            {statusTypeValues.map((status) => {
              return (
                <Status
                  key={status.id}
                  status={status}
                  statusTypeValues={statusTypeValues}
                  setStatusType={setStatusType}
                  setForce={setForce}
                  force={force}
                />
              );
            })}
          </div>
          <div className="step2__addStatus">
            <form onSubmit={(e) => addNewType(e)}>
              <div onChange={(e) => setNewStatusName(e.target.value)}>
                <RetroInput ref={inputRef} placeholder={newStatusName} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="step2__next">
        <RetroButton
          mode="gray"
          onClick={() => {
            setSteps({
              step1: true,
              step2: false,
            });
          }}
        >
          Back
        </RetroButton>
        <RetroButton
          onClick={() =>
            setSteps({
              step2: false,
              step3: true,
            })
          }
        >
          Next
        </RetroButton>
      </div>
    </div>
  );
};

export default Step2;
