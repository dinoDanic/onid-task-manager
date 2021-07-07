import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { updateDrag } from "../../firebase/firebase.utils";

import { setStatusType } from "../../redux/space/space.actions";

import StatusType from "../../components/dnd/status-type/status-type.component";

import "./board.styles.scss";

const Board = ({ station }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentSpaceId = history.location.pathname.split("/")[2];
  const currentStationId = history.location.pathname.split("/")[4];
  const [state, setState] = useState([]);

  useEffect(() => {
    setState(station);
    dispatch(setStatusType(station.statusType));
  }, [station]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (result.type === "DEFAULT") {
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }
      console.log(state.statusType);
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
      console.log(finish);
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
    } else {
      const newStatusOrder = Array.from(station.statusOrder);
      newStatusOrder.splice(source.index, 1);
      newStatusOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        statusOrder: newStatusOrder,
      };
      setState(newState);
      updateDrag(currentSpaceId, currentStationId, newState);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={"allStatusTypes"}
        type="column"
        direction="horizontal"
      >
        {(provided) => {
          const style = {};
          return (
            <div
              className="board"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={style}
            >
              <>
                {state?.statusOrder?.map((statusId, index) => {
                  const status = state.statusType[statusId];
                  const tasks = status.taskIds.map(
                    (taskId) => state.tasks[taskId]
                  );

                  return (
                    <StatusType
                      currentSpaceId={currentSpaceId}
                      currentStationId={currentStationId}
                      key={status.id}
                      status={status}
                      tasks={tasks}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </>
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
