import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";

import "./task-styles.scss";

import LoadModule from "../../modules/load-module.component.jsx/load-module.component";

const Task = ({ task, index }) => {
  const activeModules = useSelector((state) => state.space.activeModulesData);
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        const style = {
          ...provided.draggableProps.style,
          /*     boxShadow: snapshot.isDragging ? "0 0 5px -1px black" : "", */
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
            <div className="task__taskName">
              <p>{task.content}</p>
            </div>
            {activeModules?.map((module) => {
              return <LoadModule module={module} task={task} />;
            })}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;