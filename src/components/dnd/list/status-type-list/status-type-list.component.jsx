import React, { useRef, useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

import TaskList from "../task-list/task-list.component";
import RetroInput from "../../../retro/input/input.component";
import Box from "../../../retro/box/box.component";
import TaskSettings from "../../../task-settings/task-settings.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faGripLines } from "@fortawesome/free-solid-svg-icons";

import {
  createNewTask,
  toggleStatus,
  changeStatusTypeName,
} from "../../../../firebase/firebase.utils";

import "./status-type-list.styles.scss";

const StatusTypeList = ({
  currentSpaceId,
  currentStationId,
  status,
  tasks,
  index,
}) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const statusType = useSelector((state) => state.space.statusType);
  const [newTaskName, setNewTaskName] = useState("");
  const [inputName, setInputName] = useState("");
  const inputRef = useRef();
  const inputNameRef = useRef();

  console.log(status);

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

  useEffect(() => {
    setInputName(status.name);
  }, [status.name]);

  return (
    <Draggable draggableId={status.name} index={index}>
      {(provided) => (
        <div
          className="statusTypeList"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="stl__header">
            <div className="stl__arrow">
              <FontAwesomeIcon
                icon={faAngleDown}
                style={{
                  color: status.color,
                  transform: status.open ? "" : "rotate(-90deg)",
                }}
                onClick={() =>
                  toggleStatus(currentSpaceId, currentStationId, status.name)
                }
              />
            </div>
            <div className="stl__title">
              <form onSubmit={(e) => handleNameSubmit(e)}>
                <input
                  ref={inputNameRef}
                  value={inputName}
                  style={{ color: status.color }}
                  onChange={(e) => setInputName(e.target.value)}
                />
              </form>
            </div>
            <div className="stl__menu">
              <div className="stl__drag" {...provided.dragHandleProps}>
                <FontAwesomeIcon icon={faGripLines} />
              </div>
              <TaskSettings status={status} inputNameRef={inputNameRef} />
            </div>
          </div>
          <Box>
            <div className="stl__content">
              <Droppable droppableId={status.id}>
                {(provided, snapshot) => {
                  const style = {
                    backgroundColor: snapshot.isDraggingOver
                      ? "rgba(0,0,0,0.1)"
                      : "",
                    borderRadius: "8px",
                  };
                  return (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {status.open && (
                        <div className="stl__taskList" style={style}>
                          {tasks?.map((task, index) => {
                            if (task === undefined) return false;
                            return (
                              <TaskList
                                key={task.id}
                                task={task}
                                index={index}
                              />
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </Box>
          {status.open && (
            <div className="stl__newTask">
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
          )}
        </div>
      )}
    </Draggable>
  );
};

export default StatusTypeList;
