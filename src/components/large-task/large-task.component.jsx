import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { db, createMessageToTask } from "../../firebase/firebase.utils";

import "./large-task.styles.scss";

import LoadModule from "../modules/load-module.component.jsx/load-module.component";
import RetroInput from "../retro/input/input.component";
import Box from "../retro/box/box.component";
import Avatar from "../retro/avatar/avatar.component";
import Message from "../message/message.component";

const LargeTask = ({ task }) => {
  const moduleData = useSelector((state) => state.space.moduleData);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [msgs, setMsgs] = useState([]);
  const [message, setMessage] = useState("");
  const inputRef = useRef();
  const messagesEndRef = useRef();

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView();
    };
    scrollToBottom();
  }, [msgs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createMessageToTask(
      task.fromSpaceId,
      task.fromStationId,
      message,
      currentUser.uid,
      task.id
    );
    inputRef.current.value = "";
  };

  useEffect(() => {
    const { fromSpaceId, fromStationId, id } = task;
    db.collection("space")
      .doc(fromSpaceId)
      .collection("stations")
      .doc(fromStationId)
      .collection("tasks")
      .doc("tasks")
      .collection("msg")
      /* .orderBy("created", "asc") */
      .where("taskId", "==", id)
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
          <Box>
            <div className="lt__messeges">
              {msgs?.map((msg) => (
                <Message key={msg.message} msg={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="lt__input">
                <Avatar src={currentUser.image} />
                <div
                  className="lt__inputMsg"
                  onChange={(e) => setMessage(e.target.value)}
                >
                  <RetroInput ref={inputRef} placeholder="Got Update?" />
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
