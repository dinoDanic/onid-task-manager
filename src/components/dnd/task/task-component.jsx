import React from "react";
import { Draggable } from "react-beautiful-dnd";

import "./task-styles.scss";

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        const style = {
          backgroundColor: snapshot.isDragging ? "lightgreen" : "",
          ...provided.draggableProps.style,
        };
        return (
          <div
            className="task"
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={style}
          >
            <div className="handle" {...provided.dragHandleProps} />
            <p>{task.content}</p>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
