import React, { useEffect, useState, useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import {
  personFilterFunction,
  statusFilterFunction,
  timeFilterFunction,
  setTaskClassDone,
  autoUpdateTasksToUser,
  filterLogicFunction,
} from "../../task.util";
import "./task-board.styles.scss";

import LoadModule from "../../../modules/load-module.component.jsx/load-module.component";
import BoxRight from "../../../retro/box-right/box-right.component";
import LargeTask from "../../../large-task/large-task.component";
import CheckBox from "../../../retro/check-box/check-box.component";
import Subtasks from "../../subtasks/subtasks.component";

const TaskBoard = ({ task, index, status }) => {
  const activeModules = useSelector((state) => state.space.activeModulesData);
  const users = useSelector((state) => state.user.users);
  const filter = useSelector((state) => state.filter);

  const [showLargeTask, setShowLargeTask] = useState(false);
  const [statusFilter, setStatusFilter] = useState(true);
  const [timeFilter, setTimeFilter] = useState(true);
  const [personFilter, setPersonFilter] = useState(true);
  const [taskClass, setTaskClass] = useState("");
  const [filterLogic, setFilterLogic] = useState(true);
  const [msgs, setMsgs] = useState(0);

  useEffect(() => {
    setStatusFilter(statusFilterFunction(task, filter));
    setTimeFilter(timeFilterFunction(task, filter));
    setPersonFilter(personFilterFunction(task, filter));
  }, [task, filter]);

  useEffect(() => {
    autoUpdateTasksToUser(users, task);
    setTaskClass(setTaskClassDone(task));
  }, [task]);

  useEffect(() => {
    setFilterLogic(filterLogicFunction(statusFilter, timeFilter, personFilter));
  }, [statusFilter, timeFilter, personFilter]);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        const style = {
          ...provided.draggableProps.style,
          opacity: status.open ? "1" : "0",
          height: status.open ? "auto" : "10px",
        };
        return (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="task__logic"
            style={style}
          >
            {filterLogic && (
              <div
                className={`task ${taskClass}`}
                {...provided.dragHandleProps}
                style={{
                  border: showLargeTask && "1px solid #34b5e4",
                  background: showLargeTask && " rgba(52, 181, 228, 0.05)",
                }}
              >
                <div
                  className="task__expandPlace"
                  onClick={() => setShowLargeTask(!showLargeTask)}
                />
                <div className="task__header">
                  <div className="task__taskName">
                    <p>{task.content}</p>
                  </div>
                  <CheckBox
                    task={task}
                    style={{ opacity: task.done ? 1 : 0 }}
                  />
                </div>
                <Subtasks task={task} />
                <div className="task__modules">
                  {activeModules?.map((module) => {
                    return (
                      <LoadModule
                        module={module}
                        key={module.name}
                        task={task}
                        style="box"
                      />
                    );
                  })}
                </div>
              </div>
            )}
            <AnimatePresence>
              {showLargeTask && (
                <BoxRight
                  setLayer={setShowLargeTask}
                  setLayer={setShowLargeTask}
                >
                  <LargeTask task={task} msgs={msgs} />
                </BoxRight>
              )}
            </AnimatePresence>
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskBoard;
