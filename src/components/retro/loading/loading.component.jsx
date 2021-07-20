import React from "react";

import "./loading.styles.scss";

const Loading = () => {
  return (
    <div className="loading">
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>
  );
};

export default Loading;
