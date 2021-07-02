import React, { useRef, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Task from "../task/task-component";
import RetroInput from "../../retro/input/input.component";
import Box from "../../retro/box/box.component";

import { createNewTask } from "../../../firebase/firebase.utils";

import "./status-type.styles.scss";

const StatusType = ({
  currentSpaceId,
  currentStationId,
  status,
  tasks,
  index,
}) => {
  const [newTaskName, setNewTaskName] = useState("");
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewTask(currentSpaceId, currentStationId, status.name, newTaskName);
    inputRef.current.value = "";
    inputRef.current.blur();
  };
  const retroInput = {
    outlineColor: status.color,
  };
  return (
    <Draggable draggableId={status.name} index={index}>
      {(provided) => (
        <div
          className="statusType"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="st__title" {...provided.dragHandleProps}>
            <h2 style={{ color: status.color }}>{status.name}</h2>
          </div>
          <Box style={{ background: status.color }}>
            <div className="st__content">
              <Droppable droppableId={status.id}>
                {(provided, snapshot) => {
                  const style = {
                    backgroundColor: snapshot.isDraggingOver
                      ? "rgba(0,0,0,0.1)"
                      : "",
                    borderRadius: "8px",
                  };
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="st__taskList"
                      style={style}
                    >
                      {tasks.map((task, index) => (
                        <Task key={task.id} task={task} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </Box>
          <div className="st__newTask">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div onChange={(e) => setNewTaskName(e.target.value)}>
                <RetroInput
                  ref={inputRef}
                  placeholder="Add Task"
                  style={retroInput}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default StatusType;
