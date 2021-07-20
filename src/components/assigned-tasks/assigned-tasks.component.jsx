import React, { useState, useEffect } from "react";
import { db, updateUser } from "../../firebase/firebase.utils";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./assigned-tasks.styles.scss";

import DaysLeft from "../modules/days-left/days-left.component";
import Priority from "../modules/priority/priority.component";
import CreatedBy from "../modules/created-by/created-by.component";
import RetroButton from "../retro/button/retro-button.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

const AssingedTasks = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [task, setTask] = useState([]);

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

  useEffect(() => {
    const checkIfTaskHealthy = () => {
      assignedTasks?.map(async (task) => {
        console.log(task);
        const { fromSpaceId, fromStationId, id, assign } = task;
        const taskRef = db
          .collection("space")
          .doc(fromSpaceId)
          .collection("stations")
          .doc(fromStationId)
          .collection("tasks")
          .doc("tasks");
        const getTaskData = await taskRef.get();
        if (getTaskData.data() === undefined) {
          if (assign === null) {
            console.log("its null");
          }
          const getUserData = await db
            .collection("users")
            .doc(currentUser.uid)
            .get();
          const userData = getUserData.data();
          console.log(userData);
          userData.assignedTasks = userData.assignedTasks.filter(
            (task) => task.id !== id
          );
          console.log(userData);
          updateUser(currentUser.uid, userData);
          return;
        }

        const taskData = getTaskData.data().tasks;
        const theTask = taskData[id];
        if (theTask.assign.includes(assign)) {
          console.log("its ok");
          //but are you a member ?
          console.log(assign);
          const getUserData = await db.collection("users").doc(assign).get();
          const userData = getUserData.data();
          if (!userData) return;
          console.log(userData);
          db.collection("space")
            .doc(fromSpaceId)
            .get()
            .then((docSpaceData) => {
              if (docSpaceData.exists) {
                const spaceData = docSpaceData.data();
                if (spaceData.members.includes(userData.uid)) {
                  console.log("its ok ur a member");
                } else {
                  console.log("your not even a member i see");
                  db.collection("users")
                    .doc(assign)
                    .get()
                    .then((user) => {
                      const userData = user.data();
                      userData.assignedTasks = userData.assignedTasks.filter(
                        (task) => task.id !== id
                      );
                      updateUser(assign, userData);
                    });
                }
              }
            });
        } else {
          console.log("its not ok, have to delete task", id);
          if (assign) {
            const getUserData = await db.collection("users").doc(assign).get();
            const userData = getUserData.data();
            console.log(userData);
            userData.assignedTasks = userData.assignedTasks.filter(
              (task) => task.id !== id
            );
            console.log(userData);
            updateUser(assign, userData);
          }
        }
      });
    };
    checkIfTaskHealthy();
  }, [assignedTasks]);

  return (
    <div className="assignedTasks">
      {!assignedTasks?.length > 0 ? (
        <div className="at__noTasks">
          <FontAwesomeIcon icon={faTasks} size="4x" />
          <p>All Tasks Done!</p>
        </div>
      ) : (
        <>
          {assignedTasks.map((task) => {
            const { fromSpaceId, fromStationId } = task;
            return (
              <div key={task.id} className="at__item">
                <Link to={`/s/${fromSpaceId}/e/${fromStationId}/b`}>
                  <RetroButton mode="flat">
                    <div className="at__content">
                      <p>{task.content}</p>
                    </div>
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
                  </RetroButton>
                </Link>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default AssingedTasks;
