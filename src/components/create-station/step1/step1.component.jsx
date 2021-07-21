import React, { useEffect, useState } from "react";

import RetroButton from "../../retro/button/retro-button.component";
import RetroInput from "../../retro/input/input.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

import "./step1.styles.scss";

const Step1 = ({ stationName, setStationName, setSteps }) => {
  const [isNameOK, setIsNameOK] = useState(false);
  const unClick = {
    background: "gray",
    PointerEvent: "none",
  };
  const handleNext = () => {
    if (!isNameOK) {
      alert("Station name is req");
      return;
    }
    setSteps({
      step1: false,
      step2: true,
    });
  };

  useEffect(() => {
    if (stationName === "" || stationName === "Enter Station name") {
      setIsNameOK(false);
    } else {
      setIsNameOK(true);
    }
  }, [stationName]);

  return (
    <section className="sectionName">
      <h2>Create Station</h2>
      <div className="sn__icon">
        <FontAwesomeIcon icon={faTasks} size="6x" />
      </div>
      <div className="sn__name">
        {/* <p>Station name</p> */}
        <div onChange={(e) => setStationName(e.target.value)}>
          <RetroInput placeholder={stationName} />
        </div>
      </div>
      <div className="sn__next">
        <RetroButton
          onClick={() => {
            handleNext();
          }}
          style={isNameOK ? null : unClick}
        >
          Next
        </RetroButton>
      </div>
    </section>
  );
};

export default Step1;
