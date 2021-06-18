import React from "react";
import { auth } from "../../firebase/firebase.utils";

import "./space.styles.scss";

function Space() {
  return (
    <div className="space">
      <button onClick={() => auth.signOut()}>logout</button>
    </div>
  );
}

export default Space;
