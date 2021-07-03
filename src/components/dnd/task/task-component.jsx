import React, { memo, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";

import "./task-styles.scss";

import CreatedBy from "../../modules/created-by/created-by.component";
import LoadModule from "../../modules/load-module.component.jsx/load-module.component";

const Task = memo(({ task, index }) => {
  console.log("task component ");
  const moduleData = useSelector((state) => state.space.moduleData);
  const activeModules = useSelector((state) => state.space.activeModulesData);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (!moduleData) return;
    let activeModules = moduleData.filter((item) => item.active === true);
    setModules(activeModules);
  }, [moduleData]);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        const style = {
          ...provided.draggableProps.style,
          boxShadow: snapshot.isDragging ? "0 0 5px -1px black" : "",
        };
        return (
          <div
            className="task"
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={style}
          >
            <div className="task__drag" {...provided.dragHandleProps}>
              <FontAwesomeIcon icon={faGripLinesVertical} />
            </div>
            <div className="task__taskName">
              <p>{task.content}</p>
            </div>
            {activeModules?.map((module) => {
              return <LoadModule module={module} />;
            })}
            {/*             <LoadModule moduleData={moduleData} /> */}
          </div>
        );
      }}
    </Draggable>
  );
});

export default Task;
