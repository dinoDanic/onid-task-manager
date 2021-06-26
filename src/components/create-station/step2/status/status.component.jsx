import React, { useState } from "react";

import RetroButton from "../../../retro/button/retro-button.component";
import Box from "../../../retro/box/box.component";
import BoxLayer from "../../../retro/box-layer/box-layer.component";
import RetroInput from "../../../retro/input/input.component";
import Colors from "../../../colors/colors.component";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import "./status.styles.scss";

const Status = ({ status, statusType, setStatusType, setForce, force }) => {
  console.log("stat");
  const [controls, setControls] = useState(false);
  const [color, setColor] = useState(status.color);
  const [name, setName] = useState(status.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    let array = statusType;
    const newStatus = {
      name: name,
      color: color,
    };
    let index = array.findIndex((item) => item.name === status.name);

    array[index] = {
      name: name,
      color: color,
    };
    setStatusType(array);
    setControls(false);
    setForce(force + 1);
    console.log(array);
  };
  return (
    <div className="status__btn">
      <RetroButton
        style={{ background: status.color }}
        onClick={() => setControls(!controls)}
      >
        {status.name}
      </RetroButton>
      <div className="status__arrow">
        <ChevronRightIcon />
      </div>
      {controls && (
        <div className="status__controls">
          <Box>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div onChange={(e) => setName(e.target.value)}>
                <RetroInput placeholder="new name" />
              </div>
              <Colors returnColor={setColor} />
              <div className="status__setbtn">
                <RetroButton color="info" style={{ background: color }}>
                  set
                </RetroButton>
              </div>
            </form>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Status;
