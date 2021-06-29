import React from "react";

import "./select-module.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const SelectModule = ({ modules, module, setModules, setForce, force }) => {
  const toggleState = () => {
    let array = modules;
    let index = array.findIndex((item) => item.name === module.name);
    array[index].active = !module.active;
    console.log(array);
    setModules(array);
    setForce(force + 1);
  };

  return (
    <div className="selectModule">
      <div
        className={`sm__module ${
          module.active ? "sm__module-true" : "sm__module-false"
        } `}
        onClick={() => toggleState()}
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
        <p>{module.name}</p>
      </div>
    </div>
  );
};

export default SelectModule;
