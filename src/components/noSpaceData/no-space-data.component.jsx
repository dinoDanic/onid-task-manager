import React, { useState } from "react";

import RetroButton from "../../components/retro/button/retro-button.component";
import CreateSpace from "../create-space/create-space.component";

import "./no-space-data.styles.scss";

import AddIcon from "@material-ui/icons/Add";

function NoSpaceData() {
  const [create, setCreate] = useState(false);
  return (
    <>
      <div className="noSpaceData">
        <h3>Hey, seems like you dont have any Space!</h3>
        <p>
          By creating a <b>Space</b> you can invite others to work on tasks.{" "}
          <br />
          Inside <b>Space</b> you create <b>Stations</b> for You and Your
          members
        </p>
        <RetroButton onClick={() => setCreate(!create)}>
          <AddIcon fontSize="small" />
          Create new space
        </RetroButton>
      </div>
      {create && <CreateSpace setLayer={setCreate} />}
    </>
  );
}

export default NoSpaceData;
