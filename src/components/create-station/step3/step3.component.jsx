import React from "react";

import RetroButton from "../../retro/button/retro-button.component";
import SelectModule from "../../select-module/select-module.component";

import "./step3.styles.scss";

const Step3 = ({ setSteps, modules, setModules, setForce, force }) => {
  return (
    <div className="step3">
      <h2>Choose modules</h2>
      <div className="step3__modules">
        {modules.map((module) => (
          <SelectModule
            key={module.name}
            module={module}
            modules={modules}
            setModules={setModules}
            setForce={setForce}
            force={force}
          />
        ))}
      </div>
    </div>
  );
};

export default Step3;
