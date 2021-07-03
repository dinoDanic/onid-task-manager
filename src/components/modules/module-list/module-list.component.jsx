import React from "react";

import "./module-list.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import { updateModulesDb } from "../../../firebase/firebase.utils";

const ModuleList = ({
  module,
  setModules,
  modules,
  setForce,
  force,
  type,
  currentStationId,
  currentSpaceId,
}) => {
  // => dok se raid createStation 1. put ide lokalno, dalje sve prek db
  // => ako je local, obavezno naglasiti type="local"

  const toggleStateLocal = () => {
    console.log("local");
    let array = modules;
    let index = array.findIndex((item) => item.name === module.name);
    array[index].active = !module.active;
    console.log(array);
    setModules(array);
    setForce(force + 1);
  };

  const toggleStateDb = () => {
    console.log(module);
    updateModulesDb(currentSpaceId, currentStationId, module, modules);
  };

  // AKO JE DB
  return (
    <div
      className="moduleList"
      style={{
        border:
          module.active === true ? "1px solid #05ce91" : "1px solid lightgray",
        background: "white",
      }}
      mode="flat"
      onClick={() => (type === "local" ? toggleStateLocal() : toggleStateDb())}
    >
      <p
        style={{
          color: module.active === true ? "#05ce91" : "lightgray",
        }}
      >
        {module.icon === "faUser" && <FontAwesomeIcon icon={faUser} />}
        {module.icon === "faCalendarCheck" && (
          <FontAwesomeIcon icon={faCalendarCheck} />
        )}
        {module.icon === "faInfoCircle" && (
          <FontAwesomeIcon icon={faInfoCircle} />
        )}
        {module.icon === "faExclamationCircle" && (
          <FontAwesomeIcon icon={faExclamationCircle} />
        )}
        {module.icon === "faUserCheck" && (
          <FontAwesomeIcon icon={faUserCheck} />
        )}
        {module.icon === "faCalendarAlt" && (
          <FontAwesomeIcon icon={faCalendarAlt} />
        )}
        {module.name}
      </p>
    </div>
  );
};

export default ModuleList;
