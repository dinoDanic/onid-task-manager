import React, { useState, useRef } from "react";

import bg1Img from "../../img/bg1.jpeg";

import "./dock-header-styles.scss";

import {
  changeDescriptionOfSpace,
  renameSpace,
} from "../../firebase/firebase.utils";

const DockHeader = ({ activeSpaceData }) => {
  const [inputDesc, setInputDesc] = useState("");
  const [inputName, setInputName] = useState("");
  const inputRefDesc = useRef();
  const inputRefName = useRef();

  const handleSubmitDesc = (e) => {
    e.preventDefault();
    console.log(activeSpaceData.uid, inputDesc);
    changeDescriptionOfSpace(activeSpaceData.spaceId, inputDesc);
    inputRefDesc.current.blur();
  };

  const handleSubmitName = (e) => {
    e.preventDefault();
    console.log(activeSpaceData.uid, inputDesc);
    renameSpace(activeSpaceData.spaceId, inputName);
    inputRefName.current.blur();
  };

  return (
    <div className="dockHeader">
      <img src={bg1Img}></img>
      <div className="dh__header">
        <div className="dh__text">
          <div className="dh__name">
            <form onSubmit={(e) => handleSubmitName(e)}>
              <input
                ref={inputRefName}
                placeholder={activeSpaceData.name}
                onChange={(e) => setInputName(e.target.value)}
              />
            </form>
          </div>
          <div className="dh__description">
            <form onSubmit={(e) => handleSubmitDesc(e)}>
              <input
                ref={inputRefDesc}
                placeholder={activeSpaceData.description}
                onChange={(e) => setInputDesc(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DockHeader;
