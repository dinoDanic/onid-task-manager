import React, { useState, useMemo, useRef, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  createNewSubtask,
  updateSubDrag,
} from "../../../firebase/firebase.utils.js";

import RetroLabel from "../../retro/retro-label/retro-label.component";
import RetroInput from "../../retro/input/input.component";
import Subtask from "./subtask/subtask.component";
import AddSubtask from "./add-subtask/add-subtask.component";

import "./subtasks.styles.scss";

const Subtasks = ({ task }) => {
  const [state, setState] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [subtasksOpen, setSubtasksOpen] = useState(false);
  const [subtaskView, setSubtaskView] = useState(false);
  const { fromSpaceId, fromStationId, id, subtasks } = task;

  const inputRef = useRef();

  useMemo(() => {
    setState(task.subtasks);
    console.log(task);
    console.log(state);
  }, [task]);

  useEffect(() => {
    if (subtaskView) {
      inputRef.current.focus();
      console.log(inputRef);
    }
  }, [subtaskView]);

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

  const handleSubmitTask = (e) => {
    e.preventDefault();
    createNewSubtask(fromSpaceId, fromStationId, id, newSubtask);
    setSubtasksOpen(true);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable droppableId={"subtasks"} type="subtasksType">
        {(provided) => {
          return (
            <div
              className="subtasks"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {state.length > 0 ? (
                <div className="subtasks__task">
                  <div
                    className="subtasks__label"
                    onClick={() => setSubtasksOpen(!subtasksOpen)}
                  >
                    <RetroLabel>{state.length} Subtasks</RetroLabel>
                  </div>
                  {subtasksOpen && (
                    <>
                      {state.map((task, index) => {
                        return (
                          <Subtask task={task} index={index} key={task.id} />
                        );
                      })}
                    </>
                  )}
                  {provided.placeholder}
                </div>
              ) : (
                <div className="subtask__label-gray">
                  <div
                    className="subtask__addFalse"
                    onClick={() => setSubtaskView(!subtaskView)}
                  >
                    <RetroLabel color="gray"> + Add subtask</RetroLabel>
                  </div>
                  {subtaskView && <AddSubtask />}
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
