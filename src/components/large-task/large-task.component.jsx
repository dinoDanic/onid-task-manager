import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db, createUpdateToTask } from "../../firebase/firebase.utils";

import "./large-task.styles.scss";

import LoadModule from "../modules/load-module.component.jsx/load-module.component";
import RetroInput from "../retro/input/input.component";
import Box from "../retro/box/box.component";
import Avatar from "../retro/avatar/avatar.component";

const LargeTask = ({ task }) => {
  const moduleData = useSelector((state) => state.space.moduleData);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [msgs, setMsgs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const { fromSpaceId, fromStationId, id } = task;
    db.collection("space")
      .doc(fromSpaceId)
      .collection("stations")
      .doc(fromStationId)
      .collection("tasks")
      .doc("tasks")
      .collection("msg")
      .onSnapshot((msgsData) => {
        let list = [];
        msgsData.forEach((msg) => {
          list.push(msg.data());
        });
        setMsgs(list);
      });
  }, []);
  return (
    <div className="largeTask">
      <div className="lt__content">
        <h2>{task.content}</h2>
      </div>
      <div className="lt__columns">
        <div className="lt__comments">
          {msgs?.map((msg) => msg.message)}
          <Box>
            <div className="lt__messeges"></div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createUpdateToTask(
                  task.fromSpaceId,
                  task.fromStationId,
                  message,
                  task.id
                );
              }}
            >
              <div className="lt__input">
                <Avatar src={currentUser.image} />
                <div onChange={(e) => setMessage(e.target.value)}>
                  <RetroInput placeholder="Got Update?" />
                </div>
              </div>
            </form>
          </Box>
        </div>
        <div className="lt__modules">
          <Box>
            {moduleData?.map((module) => {
              return (
                <LoadModule module={module} key={module.name} task={task} />
              );
            })}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default LargeTask;
