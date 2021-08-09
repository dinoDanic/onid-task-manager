import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";

import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateSubTaskAsDone } from "../../../../firebase/firebase.utils";

import "./subtask.styles.scss";

function Subtask({ task, index }) {
  const { done, id, fromSpaceId, fromStationId, fromTaskId } = task;
  const subStyle = (isDragging, draggableStyle) => ({
    width: "100%",
    borderRadius: "10px",
    padding: "0px 7px",
    background: isDragging ? "#e9f8ff" : "",
    border: isDragging ? "1px solid #c3ecff" : "",
    ...draggableStyle,
  });
  const handleDone = () => {
    updateSubTaskAsDone(fromSpaceId, fromStationId, fromTaskId, id, done);
  };
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div
            className="subtask"
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            style={subStyle(snapshot.isDragging, provided.draggableProps.style)}
          >
            {done ? (
              <div className="subtask__done-true" onClick={() => handleDone()}>
                <FontAwesomeIcon icon={faCheckSquare} />
              </div>
            ) : (
              <div className="subtask__done-false" onClick={() => handleDone()}>
                <FontAwesomeIcon icon={faSquare} />
              </div>
            )}
            <div className="subtask__content">
              <p className={done ? "subtask__content-done" : ""}>
                {task.content}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </Draggable>
  );
}

export default Subtask;
