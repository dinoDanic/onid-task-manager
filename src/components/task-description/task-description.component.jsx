import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setTaskDescription } from "../../firebase/firebase.utils";
import RetroButton from "../retro/button/retro-button.component";

import TeaxtArea from "../retro/text-area/text-area.component";

import "./task-description.styles.scss";

const TaskDescription = ({ description, taskId }) => {
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  const [textDescription, setTextDescription] = useState("");
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTextDescription(description);
  }, [description]);

  const handleDescription = (e) => {
    e.preventDefault();
    setTaskDescription(spaceId, stationId, taskId, textDescription);
  };
  return (
    <div className="taskDescription">
      <div className="taskDescription-text">
        <p>Description</p>
      </div>
      <div className="taskDescription-box">
        <form onSubmit={(e) => handleDescription(e)}>
          <TeaxtArea
            value={textDescription}
            onChange={(e) => {
              setTextDescription(e.target.value);
              setOpacity(1);
            }}
          />
          <div className="taskDescription-button">
            <RetroButton style={{ opacity: opacity }}>Save</RetroButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDescription;
