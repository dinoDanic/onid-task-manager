import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase.utils";
import { useSelector } from "react-redux";

import "./assigned-tasks.styles.scss";

import DaysLeft from "../modules/days-left/days-left.component";
import Priority from "../modules/priority/priority.component";
import CreatedBy from "../modules/created-by/created-by.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

const AssingedTasks = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [assignedTasks, setAssignedTasks] = useState([]);
  useEffect(() => {
    if (!currentUser) return;
    db.collection("users")
      .doc(currentUser.uid)
      .onSnapshot((userData) => {
        if (userData.exists) {
          setAssignedTasks(userData.data().assignedTasks);
        }
      });
  }, [currentUser]);
  return (
    <div className="assignedTasks">
      {!assignedTasks.length > 0 ? (
        <div className="at__noTasks">
          <FontAwesomeIcon icon={faTasks} size="4x" />
          <p>All Tasks Done!</p>
        </div>
      ) : (
        <>
          {assignedTasks.map((task) => {
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
                  <div className="at__by">
                    <CreatedBy task={task} />
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default AssingedTasks;
