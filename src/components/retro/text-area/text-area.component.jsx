import React from "react";

import "./text-area.styles.scss";

const TeaxtArea = ({ ...props }) => {
  return (
    <div className="textArea">
      <textarea spellcheck="false" {...props} />
    </div>
  );
};

export default TeaxtArea;
