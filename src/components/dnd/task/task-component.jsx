import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";

import "./task-styles.scss";

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        const style = {
          ...provided.draggableProps.style,
          boxShadow: snapshot.isDragging ? "0 0 5px -1px black" : "",
        };
        return (
          <div
            className="task"
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={style}
          >
            <div className="task__drag" {...provided.dragHandleProps}>
              <FontAwesomeIcon icon={faGripLinesVertical} />
            </div>
            <p>{task.content}</p>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
