import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

import { createNewStatus } from "../../firebase/firebase.utils";

import "./board-new-status.component.styles.scss";

import RetroInput from "../retro/input/input.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const BoardNewStatus = () => {
  const stationId = useSelector((state) => state.history.stationId);
  const spaceId = useSelector((state) => state.history.spaceId);
  const [inputWidth, setInputWidth] = useState(0);
  const [inputName, setInputName] = useState("fdsa");
  const inputRef = useRef();
  return (
    <div className="boardNewStatus">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (inputName === "") {
            alert("enter name");
            return;
          }
          createNewStatus(spaceId, stationId, inputName);
          setInputWidth(0);
          inputRef.current.value = "";
        }}
      >
        <div className="bns__header">
          <div onChange={(e) => setInputName(e.target.value)}>
            <RetroInput
              ref={inputRef}
              placeholder="new status"
              style={{ width: inputWidth, opacity: inputWidth > 0 ? 1 : 0 }}
            />
          </div>
          {inputWidth > 0 ? (
            <FontAwesomeIcon
              icon={faTimesCircle}
              size="2x"
              onClick={() => setInputWidth(0)}
              style={{ opacity: inputWidth > 0 ? 0.1 : 0, marginLeft: "5px" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlusCircle}
              size="2x"
              onClick={() => {
                setInputWidth(200);
                inputRef.current.focus();
              }}
              style={{ opacity: inputWidth > 0 ? 0 : 0.1 }}
            />
          )}
        </div>
        <div
          className="bns__fakeContainer"
          style={{
            width: inputWidth > 0 ? "100%" : 0,
            opacity: inputWidth > 0 ? 0.15 : 0,
          }}
        />
        <div
          className="bns__fakeAddTask"
          style={{ opacity: inputWidth > 0 ? 0.15 : 0 }}
        >
          <p>Add Task</p>
        </div>
      </form>
    </div>
  );
};

export default BoardNewStatus;
