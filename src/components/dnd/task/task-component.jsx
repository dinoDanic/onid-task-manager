import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentUser, setUsers } from "../../../redux/user/user.actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripLinesVertical,
  faExpandAlt,
} from "@fortawesome/free-solid-svg-icons";

import "./task-styles.scss";

import LoadModule from "../../modules/load-module.component.jsx/load-module.component";
import { updateUser } from "../../../firebase/firebase.utils";

const Task = ({ task, index }) => {
  const activeModules = useSelector((state) => state.space.activeModulesData);
  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    // AUTO UPDATE TASKS
    if (!task.assign) return;

    let getUser = users.filter((item) => item.uid === task.assign);
    let user = getUser[0];

    if (user.assignedTasks.length === 0) {
      // push task
      user.assignedTasks.push(task);
      updateUser(user.uid, user);
    } else {
      // update task
      let deleteTask = user.assignedTasks.filter(
        (item) => item.assign !== task.assign
      );
      deleteTask.push(task);
      user = {
        ...user,
        assignedTasks: [...deleteTask],
      };
      updateUser(user.uid, user);
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
