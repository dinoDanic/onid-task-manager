import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import bg1Img from "../../img/bg6.jpeg";

import "./dock-header-styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFillDrip,
  faICursor,
  faTools,
} from "@fortawesome/free-solid-svg-icons";

import MiniMenu from "../retro/mini-menu/mini-menu.component";
import DeleteStation from "./delete-space/delete-space.component";
import Colors from "../colors/colors.component";

import {
  changeDescriptionOfSpace,
  renameSpace,
  updateColorOfSpace,
} from "../../firebase/firebase.utils";

const DockHeader = ({ activeSpaceData }) => {
  const spaceId = useSelector((state) => state.history.spaceId);
  const [inputDesc, setInputDesc] = useState("");
  const [inputName, setInputName] = useState("");
  const [showMiniMenu, setShowMiniMenu] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [color, setColor] = useState("");

  const inputRefDesc = useRef();
  const inputRefName = useRef();

  useEffect(() => {
    if (!color) return;
    updateColorOfSpace(spaceId, color);
    setShowColors(false);
    setShowMiniMenu(false);
  }, [color]);

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
          <div className="dh__settings-icon">
            <FontAwesomeIcon
              icon={faTools}
              onClick={() => setShowMiniMenu(!showMiniMenu)}
            />
          </div>
          {showMiniMenu && (
            <MiniMenu setLayer={setShowMiniMenu}>
              <ul>
                <li
                  onClick={() => {
                    inputRefName.current.focus();
                    setShowMiniMenu(false);
                  }}
                >
                  <div className="tooltip">Rename</div>
                  <FontAwesomeIcon icon={faICursor} fontSize="1x" />
                </li>
                <DeleteStation data={activeSpaceData} />
                <li onClick={() => setShowColors(!showColors)}>
                  <div className="tooltip">colors</div>
                  <FontAwesomeIcon icon={faFillDrip} fontSize="1x" />
                </li>
                {showColors && <Colors returnColor={setColor} />}
              </ul>
            </MiniMenu>
          )}
        </div>
      </div>
    </div>
  );
};

export default DockHeader;
