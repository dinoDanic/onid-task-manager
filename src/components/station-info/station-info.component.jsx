import React, { useState } from "react";

import {
  changeDescriptionOfStation,
  changeNameOfStation,
} from "../../firebase/firebase.utils";

import "./station-info.styles.scss";

const StationInfo = ({ data, currentSpaceId, currentStationId }) => {
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");

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

  return (
    <div className="stationInfo">
      {data && (
        <div className="si__title">
          <div className="si__name">
            <form onSubmit={(e) => handleName(e)}>
              <input
                placeholder={data.name}
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
    </div>
  );
};

export default StationInfo;
