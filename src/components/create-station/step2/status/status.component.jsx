import React, { useState } from "react";

import RetroButton from "../../../retro/button/retro-button.component";
import Box from "../../../retro/box/box.component";
import RetroInput from "../../../retro/input/input.component";
import Colors from "../../../colors/colors.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { convertArrayToObject } from "../../../../utils/utils";

import "./status.styles.scss";

const Status = ({
  status,
  statusTypeValues,
  setStatusType,
  setForce,
  force,
}) => {
  const [controls, setControls] = useState(false);
  const [newColor, setNewColor] = useState(status.color);
  const [name, setName] = useState(status.name);
  console.log(status);
  const handleSubmit = (e) => {
    e.preventDefault();
    let array = statusTypeValues;
    let index = array.findIndex((item) => item.name === status.name);
    array[index] = {
      name: name,
      fontColor: newColor,
      id: name,
      taskIds: [],
      color: "rgb(234 236 239)",
    };
    let ArrayToObject = convertArrayToObject(array, "id");
    setStatusType(ArrayToObject);
    setControls(false);
    setForce(force + 1);
    console.log(ArrayToObject);
  };

  const handleDelete = () => {
    let array = statusTypeValues;
    let arrayDeleted = array.filter((item) => item.name !== status.name);
    let ArrayToObject = convertArrayToObject(arrayDeleted, "id");
    setStatusType(ArrayToObject);
    console.log(ArrayToObject);
    /* setForce(force + 1); */
  };

  return (
    <div className="status__btn">
      <RetroButton
        style={{ background: status.color, color: status.fontColor }}
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
              <Colors returnColor={setNewColor} />

              <div className="status__setbtn">
                <RetroButton color="info" style={{ background: newColor }}>
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
