import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

import bg1Img from "../../img/bg6.jpeg";

import "./dock-header-styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import BoxLayerLite from "../retro/box-layer-lite/box-layer-lite.component";
import BoxLayer from "../retro/box-layer/box-layer.component";
import RetroButton from "../retro/button/retro-button.component";

import {
  changeDescriptionOfSpace,
  renameSpace,
} from "../../firebase/firebase.utils";
import MiniMenu from "../mini-menu/mini-menu.component";

const DockHeader = ({ activeSpaceData }) => {
  const [inputDesc, setInputDesc] = useState("");
  const [inputName, setInputName] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  /* const [showDelete, setShowDelete] = useState(false); */
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
      <img src={bg1Img} />
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

      <div className="dh__settings">
        <div className="dh__settings-tool">
          <FontAwesomeIcon
            icon={faTools}
            onClick={() => setShowSettings(!showSettings)}
          />
        </div>
        {showSettings && (
          <BoxLayerLite setLayer={setShowSettings}>
            <MiniMenu setMiniMenu={setShowSettings} />
          </BoxLayerLite>
        )}
        {/*  {showDelete && (
          <BoxLayer type="question" set setLayer={setShowDelete}>
            <h2>Delete Space {activeSpaceData.name} ?</h2>
            <div className="dh__btns">
              <RetroButton mode="gray">cancel</RetroButton>
              <RetroButton
                color="danger"
                mode="flat"
                onClick={() => deleteSpace(spaceId)}
              >
                yes
              </RetroButton>
            </div>
          </BoxLayer>
        )} */}
      </div>
    </div>
  );
};

export default DockHeader;
