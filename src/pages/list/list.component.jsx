import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { updateDrag, updateUser } from "../../firebase/firebase.utils";

import { setStatusType } from "../../redux/space/space.actions";

import StatusTypeList from "../../components/dnd/list/status-type-list/status-type-list.component";
import BoardNewStatus from "../../components/board-new-status/board-new-status.component";

import "./list.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const List = ({ station }) => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const history = useHistory();
  const currentSpaceId = history.location.pathname.split("/")[2];
  const currentStationId = history.location.pathname.split("/")[4];
  const [state, setState] = useState([]);
  const [bOpacity, setBOpacity] = useState(0);

  useEffect(() => {
    setState(station);
    dispatch(setStatusType(station.statusType));
  }, [station]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    setBOpacity(0);

    if (!destination) return;

    if (result.type === "DEFAULT") {
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

      // on drag delete
      if (destination.droppableId === "delete") {
        const taskId = draggableId;
        const statusName = source.droppableId;
        // get task ids
        const taskIds = state.statusType[statusName].taskIds.filter(
          (id) => id !== taskId
        );

        const newState = {
          ...state,
          statusType: {
            ...state.statusType,
            [statusName]: {
              ...state.statusType[statusName],
              taskIds: taskIds,
            },
          },
        };

        setState(newState);
        updateDrag(currentSpaceId, currentStationId, newState);

        // ASSIGN THING

        let findUser = users.filter((user) => {
          let tasks = user.assignedTasks.filter((task) => task.id === taskId);
          console.log(tasks);
          return tasks[0];
        });

        let theUser = findUser[0];
        if (theUser !== undefined) {
          let deletTaskFromUser = theUser.assignedTasks.filter(
            (item) => item.id !== taskId
          );

          console.log(theUser);
          console.log(deletTaskFromUser);

          let newUser = {
            ...theUser,
            assignedTasks: [...deletTaskFromUser],
          };

          console.log(newUser);
          updateUser(newUser.uid, newUser);
        }

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

  const onDragStart = (result) => {
    if (result.type === "DEFAULT") {
      setBOpacity(1);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable
        droppableId={"allStatusTypes"}
        type="column"
        direction="vertical"
      >
        {(provided) => {
          return (
            <div
              className="list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <>
                {state?.statusOrder?.map((statusId, index) => {
                  const status = state.statusType[statusId];
                  const tasks = status.taskIds.map(
                    (taskId) => state.tasks[taskId]
                  );

                  return (
                    <StatusTypeList
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

              <div className="statusType list__newStatus">
                <BoardNewStatus />
              </div>
            </div>
          );
        }}
      </Droppable>
      <div
        className="list__dragDelete"
        style={{
          opacity: bOpacity,
        }}
      >
        <Droppable droppableId="delete">
          {(provided, snapshot) => {
            const style = {
              backgroundColor: snapshot.isDraggingOver ? "rgba(0,0,0,0.1)" : "",
              borderRadius: "8px",
            };
            return (
              <>
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={style}
                >
                  <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                </div>
                <div className="list__placeholder" style={style}>
                  {provided.placeholder}
                </div>
              </>
            );
          }}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default List;
