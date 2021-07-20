import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  db,
  createMessageToTask,
  changeTaskName,
} from "../../firebase/firebase.utils";

import "./large-task.styles.scss";

import LoadModule from "../modules/load-module.component.jsx/load-module.component";
import RetroInput from "../retro/input/input.component";
import Box from "../retro/box/box.component";
import Avatar from "../retro/avatar/avatar.component";
import Message from "../message/message.component";
import Loading from "../retro/loading/loading.component";

const LargeTask = ({ task }) => {
  const moduleData = useSelector((state) => state.space.moduleData);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [msgs, setMsgs] = useState([]);
  const [message, setMessage] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const inputRef = useRef();
  const inputTaskRef = useRef();
  const messagesEndRef = useRef();

  const { fromSpaceId, fromStationId } = task;

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

  const handleChangeTask = async (e) => {
    e.preventDefault();
    try {
      setShowLoading(true);
      await changeTaskName(fromSpaceId, fromStationId, newTaskName, task.id);
    } catch (error) {
      console.log(error.message);
    } finally {
      setTimeout(() => {
        setShowLoading(false);
        inputTaskRef.current.blur();
      }, 500);
    }
  };

  return (
    <div className="largeTask">
      <div className="lt__content">
        <form onSubmit={(e) => handleChangeTask(e)}>
          {showLoading && <Loading />}
          <input
            ref={inputTaskRef}
            placeholder={task.content}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
        </form>
      </div>
      <div className="lt__columns">
        <div className="lt__comments">
          <div className="lt__messeges">
            {msgs?.map((msg) => (
              <Message key={msg.message} msg={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="lt__input">
              <Avatar src={currentUser.imageUrl} />
              <div
                className="lt__inputMsg"
                onChange={(e) => setMessage(e.target.value)}
              >
                <RetroInput ref={inputRef} placeholder="Write update" />
              </div>
            </div>
          </form>
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
