import React, { useState } from "react";

import CreateSpace from "../create-space/create-space.component";

import "./no-space-data.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

function NoSpaceData() {
  const [create, setCreate] = useState(false);
  return (
    <>
      <div className="noSpaceData">
        <FontAwesomeIcon icon={faRocket} size="4x" />
        <p>
          No Space Fond, {/* */}
          <span className="nsd__span" onClick={() => setCreate(!create)}>
            <b>Create New Space!</b>
          </span>
        </p>
        <div className="nsd__createBtn"></div>
      </div>
      {create && <CreateSpace setLayer={setCreate} />}
    </>
  );
}

export default NoSpaceData;
