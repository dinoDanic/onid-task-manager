import React, { useState } from "react";
import { createNewSpace } from "../../firebase/firebase.utils";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import Box from "../retro/box/box.component";
import RetroInput from "../retro/input/input.component";
import RetroButton from "../retro/button/retro-button.component";
import Colors from "../colors/colors.component";

import "./create-space.styles.scss";

function CreateSpace({ setLayer }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [spaceName, setSpaceName] = useState("");
  const [currentColor, setCurrentColor] = useState("#8f00ff");

  const handleNewSpace = () => {
    createNewSpace(spaceName, currentUser, currentColor, setLayer);
  };

  return (
    <motion.div className="createSpace">
      <motion.div
        className="cs__layer"
        onClick={() => setLayer(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.div
        className="cs__content"
        initial={{ y: -36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        drag
        dragConstraints={{
          top: -10,
          left: -10,
          right: 10,
          bottom: 10,
        }}
      >
        <Box>
          <h2>Create space</h2>
          <div className="cs__icon">
            <p>Preview</p>
            <RetroButton style={{ background: currentColor }}>
              {spaceName.charAt(0)}
            </RetroButton>
          </div>
          <div className="cs__spaceName">
            <p>Space name</p>
            <div onChange={(e) => setSpaceName(e.target.value)}>
              <RetroInput placeholder="Main Space" />
            </div>
          </div>
          <div className="cs__chooseColor">
            <p>Select color</p>
            <Colors returnColor={setCurrentColor} />
          </div>
          <div className="cs__createBtn">
            <RetroButton mode="gray" onClick={() => setLayer(false)}>
              Cancel
            </RetroButton>
            <RetroButton onClick={() => handleNewSpace()}>Create</RetroButton>
          </div>
        </Box>
      </motion.div>
    </motion.div>
  );
}

export default CreateSpace;
