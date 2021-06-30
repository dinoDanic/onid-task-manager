import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useHistory } from "react-router";
import { updateDrag } from "../../firebase/firebase.utils";

import StatusType from "../../components/dnd/status-type/status-type.component";

import "./board.styles.scss";

const Board = ({ station }) => {
  const history = useHistory();
  const currentSpaceId = history.location.pathname.split("/")[2];
  const currentStationId = history.location.pathname.split("/")[4];
  const [state, setState] = useState([]);

  useEffect(() => {
    setState(station);
  }, [station]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.statusType[source.droppableId];
    const finish = state.statusType[destination.droppableId];
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        statusType: {
          ...state.statusType,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      updateDrag(currentSpaceId, currentStationId, newState);
      return;
    }

    // moving from one list to anoterh

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      statusType: {
        ...state.statusType,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
    updateDrag(currentSpaceId, currentStationId, newState);
    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        <>
          {state?.statusOrder?.map((statusId) => {
            const status = state.statusType[statusId];
            const tasks = status.taskIds.map((taskId) => state.tasks[taskId]);

            return (
              <StatusType
                currentSpaceId={currentSpaceId}
                currentStationId={currentStationId}
                key={status.id}
                status={status}
                tasks={tasks}
              />
            );
          })}
        </>
      </div>
    </DragDropContext>
  );
};

export default Board;
