import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { setStatus } from "../../../firebase/firebase.utils";

import "./status.styles.scss";
import { AnimatePresence } from "framer-motion";

import BoxLayerLite from "../../retro/box-layer-lite/box-layer-lite.component";

const Status = ({ task }) => {
  const statusType = useSelector((state) => state.space.statusType);
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  const [currentStatusType, setCurrentStatusType] = useState({});
  const [statusTypeArray, setStatusTypeArray] = useState([]);
  const [showStatusType, setShowStatusType] = useState(false);

  useMemo(() => {
    if (!statusType) return;
    let toArray = Object.values(statusType);
    let findStatus = toArray.filter((item) => item.taskIds.includes(task.id));
    setCurrentStatusType(findStatus[0]);
    setStatusTypeArray(toArray);
  }, [statusType, task.id]);
  return (
    <div className="status" onClick={() => setShowStatusType(!showStatusType)}>
      <div className="status__show">
        <p style={{ color: currentStatusType.color }}>
          {currentStatusType?.name}
        </p>
      </div>
      <AnimatePresence>
        {showStatusType && (
          <div className="satus__pick">
            <BoxLayerLite setLayer={setShowStatusType}>
              {statusTypeArray?.map((status) => {
                return (
                  <div
                    key={status.name}
                    className="status__name"
                    onClick={() =>
                      setStatus(
                        spaceId,
                        stationId,
                        currentStatusType,
                        task.id,
                        status,
                        statusType
                      )
                    }
                  >
                    <p style={{ color: status.color }}>{status.name}</p>
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

export default Status;
