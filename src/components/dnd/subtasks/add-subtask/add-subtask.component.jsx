import React from "react";
import "./add-subtask.styles.scss";

const AddSubtask = () => {
  return (
    <div className="addSubtask">
      <div className="subtasks__addTrue">
        <form onSubmit={(e) => handleSubmitTask(e)}>
          <div className="subtasks__addTrue-box" />
          <div className="subtasks__input">
            <input
              type="text"
              ref={inputRef}
              onChange={(e) => setNewSubtask(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubtask;
