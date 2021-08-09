import React from "react";
import { Draggable } from "react-beautiful-dnd";

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
          <p>{task.content}</p>
        </div>
      )}
    </Draggable>
  );
}

export default Subtask;
