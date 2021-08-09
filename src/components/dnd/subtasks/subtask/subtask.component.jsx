import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { faSquare, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./subtask.styles.scss";

function Subtask({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="subtask"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <div className="subtask__checkBox" />
          <div className="subtask__content">
            <p>{task.content}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Subtask;
