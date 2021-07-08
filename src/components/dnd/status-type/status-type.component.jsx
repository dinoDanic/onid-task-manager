import React, { useRef, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Task from "../task/task-component";
import RetroInput from "../../retro/input/input.component";
import Box from "../../retro/box/box.component";
import TaskSettings from "../../task-settings/task-settings.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";

import {
  createNewTask,
  changeStatusTypeName,
} from "../../../firebase/firebase.utils";

import "./status-type.styles.scss";

const StatusType = ({
  currentSpaceId,
  currentStationId,
  status,
  tasks,
  index,
}) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const statusType = useSelector((state) => state.space.statusType);
  const [newTaskName, setNewTaskName] = useState("");
  const inputRef = useRef();
  const inputNameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewTask(
      currentSpaceId,
      currentStationId,
      status.name,
      newTaskName,
      currentUser.uid
    );
    inputRef.current.value = "";
    inputRef.current.blur();
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!statusType) return;
    changeStatusTypeName(
      currentSpaceId,
      currentStationId,
      status.name,
      inputNameRef.current.value,
      statusType
    );
  };

  const InputName = styled.input`
    &::placeholder {
      color: ${status.color};
    }
    &:hover {
    }
  `;

  return (
    <Draggable draggableId={status.name} index={index}>
      {(provided) => (
        <div
          className="statusType"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="st__header">
            <div className="st__title">
              <form onSubmit={(e) => handleNameSubmit(e)}>
                <InputName placeholder={status.name} ref={inputNameRef} />
              </form>
            </div>
            <div className="st__menu">
              <div className="st__drag" {...provided.dragHandleProps}>
                <FontAwesomeIcon icon={faGripLines} />
              </div>
              <TaskSettings status={status} />
            </div>
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
                      {tasks?.map((task, index) => (
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
                <RetroInput ref={inputRef} placeholder="Add Task" />
              </div>
            </form>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default StatusType;
