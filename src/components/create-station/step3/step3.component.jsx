import React from "react";

import ModuleList from "../../modules/module-list/module-list.component";

import "./step3.styles.scss";

const Step3 = ({ setSteps, modules, setModules, setForce, force }) => {
  return (
    <div className="step3">
      <h2 className="step3__h2">Choose active modules</h2>
      <p className="step3__p">You can always change it latter</p>
      <div className="step3__modules">
        {modules.map((module) => (
          <ModuleList
            key={module.name}
            type="local"
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
