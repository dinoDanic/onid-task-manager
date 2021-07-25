import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

import { toggleCheckBox } from "../../../firebase/firebase.utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

import "./check-box.styles.scss";

const CheckBox = ({ task }) => {
  const { id } = task;
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  const [check, setCheck] = useState(true);

  useMemo(() => {
    const { done } = task;
    if (done) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [task]);

  const handleToggleCheckBox = async () => {
    try {
      await toggleCheckBox(spaceId, stationId, id, check);
    } catch (error) {
      console.log(error.message);
    } finally {
      setCheck(!check);
    }
  };

  return (
    <div className="checkBox">
      <div className="checkBox__container">
        {check ? (
          <div
            className="checkBox__true checkBox__item"
            onClick={() => handleToggleCheckBox()}
          >
            <FontAwesomeIcon icon={faCheckSquare} />
          </div>
        ) : (
          <div
            className="checkBox__false checkBox__item"
            onClick={() => handleToggleCheckBox()}
          >
            <FontAwesomeIcon icon={faSquare} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckBox;
