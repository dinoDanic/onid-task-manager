import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase.utils";
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
  }, []);

  useEffect(() => {
    let allTasks = [];
    db.collection("space")
      .get()
      .then((spaceQuery) => {
        spaceQuery.forEach((spaceDoc) => {
          let spaceId = spaceDoc.data().spaceId;
          db.collection("space")
            .doc(spaceId)
            .collection("stations")
            .get()
            .then((stationQuery) => {
              stationQuery.forEach((stationDoc) => {
                let stationId = stationDoc.data().stationId;
                db.collection("space")
                  .doc(spaceId)
                  .collection("stations")
                  .doc(stationId)
                  .collection("tasks")
                  .doc("tasks")
                  .onSnapshot((taskData) => {
                    allTasks.push(taskData.data().tasks);
                  });
              });
            });
        });
      })
      .then(() => {
        setTask(allTasks);
      });
  }, []);

  useEffect(() => {
    console.log(task);
    task.map((tsk, nkj, index) => {
      console.log(tsk, nkj, index);
    });
  }, [task]);

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
            console.log(task);
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
