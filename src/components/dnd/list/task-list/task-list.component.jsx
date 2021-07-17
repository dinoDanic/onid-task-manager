import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import LoadModule from "../../../modules/load-module.component.jsx/load-module.component";
import LargeTask from "../../../large-task/large-task.component";
import BoxLayer from "../../../retro/box-layer/box-layer.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";

import "./task-list.styles.scss";

const TaskList = ({ task, index }) => {
  const activeModules = useSelector((state) => state.space.activeModulesData);
  const [showLargeTask, setShowLargeTask] = useState(false);
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => {
        return (
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
                    direction="vertical"
                    module={module}
                    key={module.name}
                    task={task}
                  />
                );
              })}
            </div>
            {showLargeTask && (
              <BoxLayer setLayer={setShowLargeTask}>
                <LargeTask task={task} />
              </BoxLayer>
            )}
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskList;
