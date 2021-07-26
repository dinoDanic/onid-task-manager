import React, { useRef, useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

import TaskBoard from "../../board/task-board/task-board.component";
import RetroInput from "../../../retro/input/input.component";
import Box from "../../../retro/box/box.component";
import TaskSettings from "../../../task-settings/task-settings.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLines, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import {
  createNewTask,
  changeStatusTypeName,
  toggleStatus,
} from "../../../../firebase/firebase.utils";

import "./status-type-board.styles.scss";

const StatusTypeBoard = ({
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
          className="statusType"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="st__header">
            <div className="st__arrow">
              <FontAwesomeIcon
                icon={faAngleDown}
                style={{
                  color: status.fontColor,
                  transform: status.open ? "" : "rotate(-90deg)",
                }}
                onClick={() =>
                  toggleStatus(currentSpaceId, currentStationId, status.name)
                }
              />
            </div>
            <div className="st__title">
              <form onSubmit={(e) => handleNameSubmit(e)}>
                <input
                  ref={inputNameRef}
                  value={inputName}
                  style={{ color: status.fontColor }}
                  onChange={(e) => setInputName(e.target.value)}
                />
              </form>
            </div>
            <div className="st__menu">
              <div className="st__drag" {...provided.dragHandleProps}>
                <FontAwesomeIcon icon={faGripLines} />
              </div>
              <TaskSettings status={status} inputNameRef={inputNameRef} />
            </div>
          </div>
          <Box /* style={{ backgroundColor: status.fontColor }} */>
            <div className="st__content">
              <Droppable droppableId={status.id}>
                {(provided, snapshot) => {
                  const style = {
                    backgroundColor: snapshot.isDraggingOver
                      ? "rgba(0,0,0,0.05)"
                      : "",
                    borderRadius: "8px",
                  };
                  return (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <div className="st__taskList" style={style}>
                        {tasks?.map((task, index) => {
                          if (task === undefined) return false;

                          return (
                            <TaskBoard
                              key={task.id}
                              task={task}
                              index={index}
                              status={status}
                            />
                          );
                        })}
                        {provided.placeholder}
                        <div className="st__newTask st__newTask-inside">
                          {status.open && (
                            <form
                              onSubmit={(e) => {
                                handleSubmit(e);
                              }}
                            >
                              <div
                                onChange={(e) => setNewTaskName(e.target.value)}
                              >
                                <RetroInput
                                  ref={inputRef}
                                  placeholder="Add Task"
                                />
                              </div>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </Box>
        </div>
      )}
    </Draggable>
  );
};

export default StatusTypeBoard;
