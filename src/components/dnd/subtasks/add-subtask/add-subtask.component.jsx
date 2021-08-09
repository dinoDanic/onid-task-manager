import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

import { createNewSubtask } from "../../../../firebase/firebase.utils";

import "./add-subtask.styles.scss";

const AddSubtask = ({ task, setSubtasksOpen, inputText }) => {
  const [newSubtask, setNewSubtask] = useState("");
  const { fromSpaceId, fromStationId, id, subtasks } = task;
  const inputRef = useRef();

  const handleSubmitTask = (e) => {
    e.preventDefault();
    if (newSubtask.length === 0) {
      return;
    }
    createNewSubtask(fromSpaceId, fromStationId, id, newSubtask);
    setSubtasksOpen(true);
    inputRef.current.value = "";
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <motion.div
      className="addSubtask"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="subtasks__addTrue">
        <form onSubmit={(e) => handleSubmitTask(e)}>
          <div className="subtasks__addTrue-box" />
          <div className="subtasks__input">
            <input
              type="text"
              ref={inputRef}
              onChange={(e) => setNewSubtask(e.target.value)}
              placeholder={inputText}
            />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddSubtask;
