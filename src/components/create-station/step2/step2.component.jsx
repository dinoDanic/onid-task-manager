import React, { useState, useRef, useEffect } from "react";

import RetroButton from "../../retro/button/retro-button.component";
import RetroInput from "../../retro/input/input.component";
import Box from "../../retro/box/box.component";
import Status from "./status/status.component";

import "./step2.styles.scss";

const Step2 = ({ setSteps }) => {
  console.log("step2");
  const [newStatusName, setNewStatusName] = useState("Add new");
  const [force, setForce] = useState(0);
  const [statusType, setStatusType] = useState([
    {
      name: "to do",
      color: "#34b5e4",
    },
    {
      name: "stuck",
      color: "#e2445c",
    },
    {
      name: "done",
      color: "#05ce91",
    },
  ]);
  const inputRef = useRef();
  const addNewType = (e) => {
    e.preventDefault();
    console.log("add");
    let array = statusType;
    array.push({ name: newStatusName, color: "#fbcb00" });
    setStatusType(array);
    setNewStatusName("Add new");
    inputRef.current.value = "";
  };

  return (
    <div className="step2">
      <h2>Edit Status types for your Tasks</h2>
      <div className="step2__statusContainer">
        <div className="step2__statusType">
          <div className="step2__types">
            {statusType.map((status) => {
              return (
                <Status
                  key={status.name}
                  status={status}
                  statusType={statusType}
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
