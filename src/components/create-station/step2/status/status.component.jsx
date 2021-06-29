import React, { useState } from "react";

import RetroButton from "../../../retro/button/retro-button.component";
import Box from "../../../retro/box/box.component";
import RetroInput from "../../../retro/input/input.component";
import Colors from "../../../colors/colors.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import "./status.styles.scss";

const Status = ({ status, statusType, setStatusType, setForce, force }) => {
  console.log("stat");
  const [controls, setControls] = useState(false);
  const [color, setColor] = useState(status.color);
  const [name, setName] = useState(status.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    let array = statusType;
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

  const handleDelete = () => {
    let array = statusType;
    let arrayDeleted = array.filter((item) => item.name !== status.name);
    console.log(arrayDeleted);
    setStatusType(arrayDeleted);
    /* setForce(force + 1); */
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
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
      {controls && (
        <div className="status__controls">
          <Box>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="status__header">
                <div
                  className="status__input"
                  onChange={(e) => setName(e.target.value)}
                >
                  <RetroInput placeholder="Change name" />
                </div>
                <div className="status__delete" onClick={() => handleDelete()}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </div>
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
