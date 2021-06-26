import React from "react";

import RetroButton from "../../retro/button/retro-button.component";

import "./step3.styles.scss";

const Step3 = () => {
  return (
    <div className="step3">
      <h2>Choose modules</h2>
      <div className="step3__create">
        <RetroButton>create</RetroButton>
      </div>
    </div>
  );
};

export default Step3;
