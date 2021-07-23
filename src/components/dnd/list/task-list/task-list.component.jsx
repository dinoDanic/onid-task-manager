import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import LoadModule from "../../../modules/load-module.component.jsx/load-module.component";
import LargeTask from "../../../large-task/large-task.component";
import BoxRight from "../../../retro/box-right/box-right.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";

import "./task-list.styles.scss";

const TaskList = ({ task, index }) => {
  const activeModules = useSelector((state) => state.space.activeModulesData);
  const filter = useSelector((state) => state.filter);
  const [showLargeTask, setShowLargeTask] = useState(false);
  const [statusFilter, setStatusFilter] = useState(true);
  const [timeFilter, setTimeFilter] = useState(true);

  useEffect(() => {
    // check if all is true
    const isAllTrue = filter.status.filter((item) => item.status === false);
    if (isAllTrue.length === 4) {
      setStatusFilter(true);
      return;
    }
    // what is this task ?
    const thisTaskIs = task.priority.filter((item) => item.active === true);
    const thisTaskName = thisTaskIs[0].name.toLowerCase();
    // ok. is urgent on ?
    const i = filter.status.findIndex((item) => item.name === thisTaskName);
    if (i >= 0) {
      const statusIs = filter.status[i].status;
      if (!statusIs) {
        setStatusFilter(false);
      } else {
        setStatusFilter(true);
      }
    }
  }, [task, filter]);

  useEffect(() => {
    const { time } = filter;
    console.log("task time", task.time);
    console.log("filter time", time);
    if (time === null) {
      setTimeFilter(true);
      return;
    }
    if (time === 0 && task.time === 0) {
      setTimeFilter(true);
      return;
    }
    if (time === 1 && task.time <= 1) {
      setTimeFilter(true);
      return;
    }
    if (time === 7 && task.time <= 7) {
      setTimeFilter(true);
      return;
    }
    if (time === 30 && task.time <= 30) {
      setTimeFilter(true);
      return;
    } else {
      setTimeFilter(false);
    }
  }, [filter, task]);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => {
        return (
          <>
            {statusFilter && (
              <>
                {timeFilter && (
                  <div
                    className="taskList"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <div className="tl__task">
                      <p>{task.content}</p>
                    </div>
                    <div
                      className="tl__clickable"
                      onClick={() => setShowLargeTask(!showLargeTask)}
                    />
                    <div className="tl__drag" {...provided.dragHandleProps}>
                      <FontAwesomeIcon icon={faGripLinesVertical} />
                    </div>
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
              </>
            )}
          </>
        );
      }}
    </Draggable>
  );
};

export default TaskList;
