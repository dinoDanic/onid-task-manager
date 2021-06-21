import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import RetroButton from "../retro/button/retro-button.component";
import CreateSpace from "../create-space/create-space.component";

import "./space-fly.styles.scss";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import { AnimatePresence } from "framer-motion";

const SpaceFly = () => {
  const spaceData = useSelector((state) => state.space.spaceData);
  const [createNewSpace, setCreateNewSpace] = useState(false);

  return (
    <>
      <div className="spaceFly">
        <div className="sf__flys">
          {/* <div className="sf__flysName">
            <p>
              <i>Space</i>
            </p>
          </div> */}
          {spaceData?.map((space) => {
            return (
              <div key={space.spaceId}>
                <Link to={`/s/${space.spaceId}`}>
                  <RetroButton
                    style={{ background: `${space.color}` }}
                    charAt
                    size="box"
                  >
                    {space.name}
                  </RetroButton>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="sf__controls">
          <RetroButton size="box" onClick={() => setCreateNewSpace(true)}>
            <AddIcon fontSize="small" />
          </RetroButton>
          <Link to="/">
            <RetroButton size="box">
              <HomeIcon fontSize="small" />
            </RetroButton>
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
