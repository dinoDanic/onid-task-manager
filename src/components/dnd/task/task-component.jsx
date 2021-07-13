import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripLinesVertical,
  faExpandAlt,
} from "@fortawesome/free-solid-svg-icons";

import "./task-styles.scss";

import LoadModule from "../../modules/load-module.component.jsx/load-module.component";
import BoxLayer from "../../retro/box-layer/box-layer.component";
import LargeTask from "../../large-task/large-task.component";

import { updateUser } from "../../../firebase/firebase.utils";

const Task = ({ task, index }) => {
  const activeModules = useSelector((state) => state.space.activeModulesData);
  const users = useSelector((state) => state.user.users);
  let getUser = users.filter((item) => item.uid === task.assign);
  const [showLargeTask, setShowLargeTask] = useState(false);
  let user = getUser[0];

  useEffect(() => {
    console.log("auto update tasks => db.users");
    // AUTO UPDATE TASKS
    if (!task.assign) return;
    if (user === undefined) return;

    const gotTask = user.assignedTasks.filter((item) => item.id === task.id);
    const gotTaskRes = gotTask[0];

    if (gotTaskRes === undefined) {
      return;
    } else {
      let copyUser = user;
      let deleteOldTask = copyUser.assignedTasks.filter(
        (item) => item.id !== task.id
      );
      deleteOldTask.push(task);
      let newUser = {
        ...copyUser,
        assignedTasks: [...deleteOldTask],
      };
      updateUser(user.uid, newUser);
    }
  }, [task]);
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => {
        const style = {
          ...provided.draggableProps.style,
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
            <div className="task__header">
              <div className="task__taskName">
                <p>{task.content}</p>
              </div>
              <div
                className="task__expand"
                onClick={() => setShowLargeTask(!showLargeTask)}
              >
                <FontAwesomeIcon icon={faExpandAlt} />
              </div>
            </div>
            {activeModules?.map((module) => {
              return (
                <LoadModule module={module} key={module.name} task={task} />
              );
            })}
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

export default Task;
