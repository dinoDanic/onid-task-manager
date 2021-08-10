import React, { useState, useMemo, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { updateSubDrag } from "../../../firebase/firebase.utils.js";
import { AnimatePresence } from "framer-motion";

import RetroLabel from "../../retro/retro-label/retro-label.component";
import Subtask from "./subtask/subtask.component";
import AddSubtask from "./add-subtask/add-subtask.component";

import "./subtasks.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

const Subtasks = ({ task, open, length, opacity }) => {
  const [state, setState] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [subtasksOpen, setSubtasksOpen] = useState(false);
  const [subtaskView, setSubtaskView] = useState(false);
  const { fromSpaceId, fromStationId, id, subtasks, done } = task;

  useMemo(() => {
    setState(task.subtasks);
  }, [task]);

  useEffect(() => {
    if (open) {
      setSubtasksOpen(true);
    }
  }, [open]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (result.type === "subtasksType") {
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const start = source.index;
      const finish = destination.index;

      const newData = reorder(state, start, finish);
      setState(newData);
      updateSubDrag(fromSpaceId, fromStationId, id, newData);
    }
  };
  const onDragStart = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable droppableId={"subtasks"} type="subtasksType">
        {(provided) => {
          return (
            <div
              className="subtasks"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ opacity: done && 0.2, pointerEvents: done && "none" }}
            >
              {state?.length > 0 ? (
                <div className="subtasks__task">
                  <div
                    className="subtasks__label"
                    onClick={() =>
                      !length ? setSubtasksOpen(!subtasksOpen) : ""
                    }
                  >
                    <RetroLabel>
                      {open ? (
                        <>
                          {state.length} subtasks {/* */}
                          <FontAwesomeIcon icon={faCheckDouble} />
                        </>
                      ) : (
                        <>
                          {state.length}{" "}
                          <FontAwesomeIcon icon={faCheckDouble} />
                        </>
                      )}
                    </RetroLabel>
                  </div>
                  <AnimatePresence>
                    {subtasksOpen && (
                      <>
                        {state.map((task, index) => {
                          return (
                            <Subtask task={task} index={index} key={task.id} />
                          );
                        })}

                        {provided.placeholder}
                        <AddSubtask
                          task={task}
                          setSubtasksOpen={setSubtasksOpen}
                          inputText="Add Subtask"
                        />
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div
                  className={`subtask__label-gray ${opacity}`}
                  style={{ opacity: subtaskView ? 1 : 0 }}
                >
                  <div
                    className="subtask__addFalse"
                    onClick={() => setSubtaskView(!subtaskView)}
                  >
                    <RetroLabel color="gray">
                      Add subtask <FontAwesomeIcon icon={faCheckDouble} />
                    </RetroLabel>
                  </div>
                  {subtaskView && (
                    <AddSubtask task={task} setSubtasksOpen={setSubtasksOpen} />
                  )}
                </div>
              )}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Subtasks;
