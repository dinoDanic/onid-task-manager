import React, { memo } from "react";

import CreatedBy from "../created-by/created-by.component";
import Assign from "../assign/assign-component";
import Priority from "../priority/priority.component";
import Status from "../status/status.component";
import CreatedDate from "../created-date/created-date.component";
import Deadline from "../deadline/deadline.component";
import DaysLeft from "../days-left/days-left.component";

import "./load-module.styles.scss";

const LoadModule = memo(({ module, task, style }) => {
  return (
    <div className="loadModule">
      {!style && (
        <div className="lm__name">
          <p>{module.name}</p>
        </div>
      )}
      <div
        className={`${!style && "lm__module"} ${
          style === "vertical" && "lm__module-vertical"
        } ${style === "box" && "lm__module-box"}`}
      >
        {module.name === "Priority" && <Priority task={task} />}
        {module.name === "CreatedBy" && <CreatedBy task={task} />}
        {module.name === "Status" && <Status task={task} />}
        {module.name === "CreatedDate" && <CreatedDate task={task} />}
        {module.name === "Deadline" && <Deadline task={task} />}
        {module.name === "DaysLeft" && <DaysLeft task={task} />}
        {module.name === "Assign" && <Assign task={task} />}
      </div>
    </div>
  );
});

export default LoadModule;
