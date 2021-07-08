import React, { useState } from "react";
import { useSelector } from "react-redux";

import BoxLayerLite from "../retro/box-layer-lite/box-layer-lite.component";
import BoxLayer from "../retro/box-layer/box-layer.component";
import RetroButton from "../retro/button/retro-button.component";

import { deleteStatusType } from "../../firebase/firebase.utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFillDrip,
  faTools,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import "./task-settings.styles.scss";

const TaskSettings = ({ status }) => {
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  const [showSettings, setShowSettings] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="taskSettings">
      <div
        className="ts__settings"
        onClick={() => setShowSettings(!showSettings)}
      >
        <FontAwesomeIcon icon={faTools} />
      </div>
      {showSettings && (
        <BoxLayerLite setLayer={setShowSettings}>
          <div className="ts__item" onClick={() => setShowDelete(!showDelete)}>
            <FontAwesomeIcon icon={faTrashAlt} />
            <p>delete</p>
          </div>
          <div className="ts__item">
            <FontAwesomeIcon icon={faFillDrip} />
            <p>change color</p>
          </div>
        </BoxLayerLite>
      )}
      {showDelete && (
        <div className="ts__delete">
          <BoxLayer setLayer={setShowDelete}>
            <div className="ts__delete-msg">
              <h2>
                Delete status
                <span style={{ color: status.color }}> {status.name}</span> ?
              </h2>
              <p>
                All task inside
                <i> {status.name} </i>
                status will be deleted
              </p>
            </div>
            <div className="ts__delete-btns">
              <RetroButton mode="gray" onClick={() => setShowDelete(false)}>
                cancel
              </RetroButton>
              <RetroButton
                color="danger"
                mode="flat"
                onClick={() =>
                  deleteStatusType(spaceId, stationId, status.name)
                }
              >
                yes
              </RetroButton>
            </div>
          </BoxLayer>
        </div>
      )}
    </div>
  );
};

export default TaskSettings;
