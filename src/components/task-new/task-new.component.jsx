import React from "react";

const TaskNew = () => {
  return (
    <div className="taskNew">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div onChange={(e) => setNewTaskName(e.target.value)}>
          <RetroInput ref={inputRef} placeholder="Add Task" />
        </div>
      </form>
    </div>
  );
};

export default TaskNew;
