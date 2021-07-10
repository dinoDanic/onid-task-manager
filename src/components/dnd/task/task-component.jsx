import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentUser } from "../../../redux/user/user.actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripLinesVertical,
  faExpandAlt,
} from "@fortawesome/free-solid-svg-icons";

import "./task-styles.scss";

import LoadModule from "../../modules/load-module.component.jsx/load-module.component";

const Task = ({ task, index }) => {
  const activeModules = useSelector((state) => state.space.activeModulesData);
  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    // AUTO UPDATE TASKS
    if (!task.assign) return;
    console.log("updateing user to redux");
    let getUser = users.filter((item) => item.uid === task.assign);
    let user = getUser[0];
    let assignedTasks = user.assignedTasks;

    let i = assignedTasks.findIndex((item) => item.id === task.id);
    if (i === -1) {
      assignedTasks.push(task);
      user = {
        ...user,
        assignedTasks: [...assignedTasks],
      };
      dispatch(setCurrentUser(user));
    } else {
      let newtasks = assignedTasks.filter((item) => item.id !== task.id);
      newtasks.push(task);
      user = {
        ...user,
        assignedTasks: [...newtasks],
      };
      dispatch(setCurrentUser(user));
    }
  }, [task, users]);
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
              <div className="task__expand">
                <FontAwesomeIcon icon={faExpandAlt} />
              </div>
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
