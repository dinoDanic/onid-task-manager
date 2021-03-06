import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  db,
  createMessageToTask,
  changeTaskName,
} from "../../firebase/firebase.utils";

import "./large-task.styles.scss";

import LoadModule from "../modules/load-module.component.jsx/load-module.component";
import RetroButton from "../retro/button/retro-button.component";
import TaskDescription from "../task-description/task-description.component";
import Avatar from "../retro/avatar/avatar.component";
import Message from "../message/message.component";
import Loading from "../retro/loading/loading.component";
import Subtasks from "../dnd/subtasks/subtasks.component";

const LargeTask = ({ task }) => {
  const moduleData = useSelector((state) => state.space.moduleData);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [msgs, setMsgs] = useState([]);
  const [message, setMessage] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [limit, setLimit] = useState(3);
  const inputTaskRef = useRef();
  const textareaRef = useRef();

  const { fromSpaceId, fromStationId } = task;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      alert("no message");
      return;
    }
    createMessageToTask(
      task.fromSpaceId,
      task.fromStationId,
      message,
      currentUser.uid,
      task.id
    );
    textareaRef.current.value = "";
    setMessage("");
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
      .limit(limit)
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
      <div className="lt__taskStuff">
        <form onSubmit={(e) => handleChangeTask(e)}>
          {showLoading && <Loading />}
          <input
            ref={inputTaskRef}
            placeholder={task.content}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
        </form>
      </div>
      <div className="lt__content">
        <div className="lt__modules">
          {moduleData?.map((module) => {
            return <LoadModule module={module} key={module.name} task={task} />;
          })}
          <div className="lt__description">
            <TaskDescription description={task.description} taskId={task.id} />
          </div>
          <div className="lt__subtasks">
            <Subtasks task={task} open opacity="opacityTrue" />
          </div>
        </div>

        <div className="lt__writeUpdate">
          <div className="lt__writeUpdate-msgs">
            {msgs.map((msg) => {
              return <Message msg={msg} />;
            })}
          </div>
          <div className="lt__writeUpdate-send">
            <div className="lt__writeUpdate-avatar">
              <Avatar src={currentUser.imageUrl} />
            </div>
            <div className="lt__writeUpdate-message">
              <form onSubmit={(e) => handleSubmit(e)}>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  ref={textareaRef}
                  placeholder="Write update"
                />
                <div className="lt__writeUpdate-btn">
                  <RetroButton>Submit</RetroButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LargeTask;
