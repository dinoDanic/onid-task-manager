import React, { memo } from "react";

import CreatedBy from "../created-by/created-by.component";
import Assign from "../assign/assign-component";
import Priority from "../priority/priority.component";
import Status from "../status/status.component";

import "./load-module.styles.scss";

const LoadModule = memo(({ module, task }) => {
  return (
    <div className="loadModule">
      <div className="lm__name">
        <p>{module.name}</p>
      </div>
      <div className="lm__module">
        {module.name === "CreatedBy" && <CreatedBy task={task} />}
        {module.name === "Assign" && <Assign task={task} />}
        {module.name === "Priority" && <Priority task={task} />}
        {module.name === "Status" && <Status task={task} />}
      </div>
    </div>
  );
});

export default LoadModule;
