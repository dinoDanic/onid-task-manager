import React from "react";
import { useSelector } from "react-redux";

import "./assigned-tasks.styles.scss";

import DaysLeft from "../modules/days-left/days-left.component";

const AssingedTasks = () => {
  const assignedTasks = useSelector(
    (state) => state.user.currentUser.assignedTasks
  );
  return (
    <div className="assignedTasks">
      {assignedTasks?.map((task) => {
        console.log(task);
        return (
          <div className="at__task">
            <p>{task.content}</p>
            <DaysLeft task={task} />
          </div>
        );
      })}
    </div>
  );
};

export default AssingedTasks;
