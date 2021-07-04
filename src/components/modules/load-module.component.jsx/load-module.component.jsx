import React, { memo, useState, useEffect } from "react";
import CreatedBy from "../created-by/created-by.component";

import "./load-module.styles.scss";

const LoadModule = memo(({ module }) => {
  useEffect(() => {}, []);
  return (
    <div className="loadModule">
      <div className="lm__name">
        <p>{module.name}</p>
      </div>
      <div className="lm__module">
        {module.name === "CreatedBy" && <CreatedBy />}
      </div>
    </div>
  );
});

export default LoadModule;
