import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

import "./priority.styles.scss";

import BoxLayerLite from "../../retro/box-layer-lite/box-layer-lite.component";

import { setPriority } from "../../../firebase/firebase.utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";

const Priority = ({ task }) => {
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);

  const [currentPriority, setCurrentPriority] = useState();
  const [showPriority, setShowPriority] = useState(false);

  useMemo(() => {
    if (!task.priority) return;
    const { priority } = task;
    const findActive = priority.filter((item) => item.active === true);
    setCurrentPriority(findActive[0]);
  }, [task]);

  return (
    <div className="priority">
      <>
        {currentPriority && (
          <div
            className="priority__current"
            onClick={() => setShowPriority(!showPriority)}
          >
            <FontAwesomeIcon
              icon={faFire}
              style={{ color: currentPriority.color }}
            />
            {/* <p style={{ color: currentPriority.color }}>
              {currentPriority.name}
            </p> */}
          </div>
        )}
      </>
      <AnimatePresence>
        {showPriority && (
          <div className="priority__show">
            <BoxLayerLite setLayer={setShowPriority}>
              {task?.priority?.map((priority) => {
                return (
                  <div
                    className="priority__priority"
                    key={priority.name}
                    onClick={() => {
                      setPriority(
                        spaceId,
                        stationId,
                        task.id,
                        task.priority,
                        priority
                      );
                      setShowPriority(false);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faFire}
                      style={{ color: priority.color }}
                    />
                    <p style={{ color: priority.color }}>{priority.name}</p>
                  </div>
                );
              })}
            </BoxLayerLite>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Priority;
