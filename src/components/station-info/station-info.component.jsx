import React, { useState, useRef } from "react";
import { useHistory } from "react-router";

import {
  changeDescriptionOfStation,
  changeNameOfStation,
  deleteStation,
} from "../../firebase/firebase.utils";

import MiniMenu from "../retro/mini-menu/mini-menu.component";
import Loading from "../retro/loading/loading.component";
import BoxLayer from "../retro/box-layer/box-layer.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faICursor, faTools, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./station-info.styles.scss";
import RetroButton from "../retro/button/retro-button.component";

const StationInfo = ({ data, currentSpaceId, currentStationId }) => {
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [showMiniMenu, setShowMiniMenu] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const history = useHistory();
  const inputRefName = useRef();

  const handleDescription = (e) => {
    e.preventDefault();
    changeDescriptionOfStation(
      currentSpaceId,
      currentStationId,
      inputDescription
    );
  };

  const handleName = (e) => {
    e.preventDefault();
    changeNameOfStation(currentSpaceId, currentStationId, inputName);
  };

  const handleDeleteStation = async () => {
    try {
      await deleteStation(currentSpaceId, currentStationId);
    } catch (error) {
      console.log(error.message);
    } finally {
      history.push("/");
      setShowLoading(false);
      setShowMiniMenu(false);
    }
  };

  return (
    <div className="stationInfo">
      {showLoading && <Loading />}
      {data && (
        <div className="si__title">
          <div className="si__name">
            <form onSubmit={(e) => handleName(e)}>
              <input
                placeholder={data.name}
                ref={inputRefName}
                onChange={(e) => setInputName(e.target.value)}
              />
            </form>
          </div>
          <div className="si__description">
            <form onSubmit={(e) => handleDescription(e)}>
              <input
                placeholder={data.description}
                onChange={(e) => setInputDescription(e.target.value)}
              />
            </form>
          </div>
        </div>
      )}
      <div className="sm__settings">
        <FontAwesomeIcon
          icon={faTools}
          size="2x"
          onClick={() => setShowMiniMenu(!showMiniMenu)}
        />
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
                <FontAwesomeIcon icon={faICursor} />
              </li>
              <li onClick={() => setshowDelete(true)}>
                <div className="tooltip">Delete</div>
                <FontAwesomeIcon icon={faTrash} />
              </li>
            </ul>
          </MiniMenu>
        )}
      </div>
      {showDelete && (
        <BoxLayer setLayer={setshowDelete}>
          <h2>Delete station {data.name} ?</h2>
          <div className="si__btns">
            <RetroButton mode="gray" onClick={() => setshowDelete(false)}>
              Cancel
            </RetroButton>
            <RetroButton color="danger" onClick={() => handleDeleteStation()}>
              Delete
            </RetroButton>
          </div>
        </BoxLayer>
      )}
    </div>
  );
};

export default StationInfo;
