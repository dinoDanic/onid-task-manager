import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { setIdsNull } from "../../redux/history/history.actions";

import RetroButton from "../retro/button/retro-button.component";
import CreateSpace from "../create-space/create-space.component";
import Icon from "./icon/icon.component";

import "./space-fly.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRocket,
  faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";

const SpaceFly = () => {
  const spaceData = useSelector((state) => state.space.spaceData);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const [createNewSpace, setCreateNewSpace] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    if (path === "/") {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  }, [location]);

  return (
    <>
      <div className="spaceFly">
        <p>Space</p>
        <div className="sf__flys">
          {spaceData?.map((space) => {
            return (
              <div className="sf__icon" key={space.spaceId}>
                <Link to={`/s/${space.spaceId}`}>
                  <Icon space={space} />
                </Link>
              </div>
            );
          })}
        </div>
        <div className="sf__controls">
          <RetroButton size="box" onClick={() => setCreateNewSpace(true)}>
            <FontAwesomeIcon icon={faRocket} />
          </RetroButton>
          <Link to="/" onClick={() => dispatch(setIdsNull())}>
            <div className="sf__controls-home">
              <RetroButton size="box">
                <FontAwesomeIcon icon={faHome} />
              </RetroButton>
              {showArrow && (
                <div className="sf__controls-homeArrow">
                  <FontAwesomeIcon icon={faCaretLeft} size="3x" />
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
      <AnimatePresence>
        {createNewSpace && <CreateSpace setLayer={setCreateNewSpace} />}
      </AnimatePresence>
    </>
  );
};

export default SpaceFly;
