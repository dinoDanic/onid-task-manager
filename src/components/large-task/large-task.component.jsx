import React from "react";
import { useSelector } from "react-redux";

import "./large-task.styles.scss";

import LoadModule from "../modules/load-module.component.jsx/load-module.component";
import RetroInput from "../retro/input/input.component";
import Box from "../retro/box/box.component";

const LargeTask = ({ task }) => {
  const moduleData = useSelector((state) => state.space.moduleData);
  return (
    <div className="largeTask">
      <div className="lt__content">
        <h2>{task.content}</h2>
      </div>
      <div className="lt__columns">
        <div className="lt__comments">
          <Box>
            <form>
              <RetroInput placeholder="Got Update?" />
            </form>
          </Box>
        </div>
        <div className="lt__modules">
          <Box>
            {moduleData?.map((module) => {
              return (
                <LoadModule module={module} key={module.name} task={task} />
              );
            })}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default LargeTask;
