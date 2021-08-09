import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { createNewSubtask } from "../../../firebase/firebase.utils.js";

import RetroLabel from "../../retro/retro-label/retro-label.component";
import RetroInput from "../../retro/input/input.component";
import Subtask from "./subtask/subtask.component";

import "./subtasks.styles.scss";

const Subtasks = ({ task }) => {
  const station = task;
  const [newSubtask, setNewSubtask] = useState("");
  const [state, setState] = useState([]);
  const { fromSpaceId, fromStationId, id, subtasks } = task;

  useEffect(() => {
    setState(task);
  }, [task]);

  const tasks = Object.values(subtasks);

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
      const start = task.source.index;
      const finish = task.destionation.index;
      console.log(result);
      const newData = reorder(task, start, finish);
      setState({ newData });
    }
  };
  const onDragStart = () => {};

  const handleSubmitTask = (e) => {
    e.preventDefault();
    createNewSubtask(fromSpaceId, fromStationId, id, newSubtask);
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
              <div className="subtasks__task">
                <RetroLabel>3 Subtasks</RetroLabel>
                {tasks.map((task, index) => {
                  return <Subtask task={task} index={index} key={task.id} />;
                })}
                {provided.placeholder}
              </div>
              <div className="subtasks__add">
                <form onSubmit={(e) => handleSubmitTask(e)}>
                  <RetroInput
                    text="add"
                    onChange={(e) => setNewSubtask(e.target.value)}
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Subtasks;
