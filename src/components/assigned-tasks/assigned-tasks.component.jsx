import React from "react";
import { useSelector } from "react-redux";

import "./assigned-tasks.styles.scss";

import DaysLeft from "../modules/days-left/days-left.component";
import Priority from "../modules/priority/priority.component";
import Status from "../modules/status/status.component";

const AssingedTasks = () => {
  const assignedTasks = useSelector(
    (state) => state.user.currentUser.assignedTasks
  );
  return (
    <div className="assignedTasks">
      {assignedTasks?.map((task) => {
        console.log(task);
        return (
          <div className="at__task" key={task.id}>
            <p>{task.content}</p>
            <div className="at__modules">
              <div className="at__daysLeft">
                <DaysLeft task={task} />
              </div>
              <div className="at__priority">
                <Priority task={task} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssingedTasks;
