import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import BoxLayer from "../retro/box-layer/box-layer.component";
import RetroButton from "../retro/button/retro-button.component";
import Colors from "../colors/colors.component";
import MiniMenu from "../retro/mini-menu/mini-menu.component";

import { deleteStatusType, setTaskColor } from "../../firebase/firebase.utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFillDrip,
  faICursor,
  faTools,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import "./task-settings.styles.scss";

const TaskSettings = ({ status, inputNameRef }) => {
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  const [showSettings, setShowSettings] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (color === null) return;

    setTaskColor(spaceId, stationId, status.name, color);
    setShowColors(false);
    setShowSettings(false);
  }, [color]);

  return (
    <div className="taskSettings">
      <div
        className="ts__settings"
        onClick={() => setShowSettings(!showSettings)}
      >
        <FontAwesomeIcon icon={faTools} />
      </div>
      {showSettings && (
        <MiniMenu setLayer={setShowSettings}>
          <ul>
            <li onClick={() => setShowDelete(!showDelete)}>
              <div className="tooltip">Delete</div>
              <FontAwesomeIcon icon={faTrashAlt} />
            </li>
            <li onClick={() => setShowColors(!showColors)}>
              <div className="tooltip">Colors</div>
              <FontAwesomeIcon icon={faFillDrip} />
            </li>
            <li
              onClick={() => {
                inputNameRef.current.focus();
                setShowSettings(false);
              }}
            >
              <div className="tooltip">Rename</div>
              <FontAwesomeIcon icon={faICursor} />
            </li>
          </ul>
          {showColors && (
            <motion.div
              className="ts__changeColor"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 1 }}
            >
              <Colors returnColor={setColor} />
            </motion.div>
          )}
        </MiniMenu>
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
