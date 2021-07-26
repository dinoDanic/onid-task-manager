import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import {
  autoUpdateTasksToUser,
  personFilterFunction,
  statusFilterFunction,
  timeFilterFunction,
  setTaskClassDone,
  filterLogicFunction,
} from "../../task.util";

import LoadModule from "../../../modules/load-module.component.jsx/load-module.component";
import LargeTask from "../../../large-task/large-task.component";
import BoxRight from "../../../retro/box-right/box-right.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";

import "./task-list.styles.scss";

import CheckBox from "../../../retro/check-box/check-box.component";

const TaskList = ({ task, index, status }) => {
  const activeModules = useSelector((state) => state.space.activeModulesData);
  const users = useSelector((state) => state.user.users);
  const filter = useSelector((state) => state.filter);

  const [showLargeTask, setShowLargeTask] = useState(false);
  const [statusFilter, setStatusFilter] = useState(true);
  const [personFilter, setPersonFilter] = useState(true);
  const [timeFilter, setTimeFilter] = useState(true);
  const [taskClass, setTaskClass] = useState("");
  const [filterLogic, setFilterLogic] = useState(true);

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
      {(provided) => {
        const style = {
          ...provided.draggableProps.style,
          opacity: status.open ? "1" : "0",
          height: status.open ? "auto" : "10px",
        };
        return (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="taskList__logic"
            style={style}
          >
            <div className="tl__drag" {...provided.dragHandleProps}>
              <FontAwesomeIcon icon={faGripLinesVertical} />
            </div>
            {filterLogic && (
              <div className={`taskList ${taskClass}`}>
                <div className="tl__task">
                  <CheckBox task={task} />
                  <p>{task.content}</p>
                </div>
                <div
                  className="tl__clickable"
                  onClick={() => setShowLargeTask(!showLargeTask)}
                />

                <div className="tl__modules">
                  {activeModules?.map((module) => {
                    return (
                      <LoadModule
                        style="vertical"
                        module={module}
                        key={module.name}
                        task={task}
                      />
                    );
                  })}
                </div>
                {showLargeTask && (
                  <BoxRight setLayer={setShowLargeTask}>
                    <LargeTask task={task} />
                  </BoxRight>
                )}
              </div>
            )}
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskList;
