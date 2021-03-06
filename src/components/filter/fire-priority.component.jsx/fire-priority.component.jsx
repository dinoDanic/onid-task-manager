import React from "react";
import { useDispatch } from "react-redux";

import { toggleStatus } from "../../../redux/filter/filter.actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

import Tooltip from "../../retro/tooltip/tooltip.component";

import "./fire-priority.styles.scss";

const FirePriority = ({ priority }) => {
  const { name, status } = priority;
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(toggleStatus(name))}
      className={`firePriority ${status && "firePriority__active"}`}
    >
      <div className={`firePriority-item filter__${name}`}>
        <Tooltip text={name} />
        <FontAwesomeIcon
          icon={faFire}
          style={
            {
              /*  opacity: status ? 1 : 0.5,
            transform: status ? "scale(1.15)" : "scale(1)", */
            }
          }
        />
      </div>
    </div>
  );
};

export default FirePriority;
