import taskActionTypes from "./tasks.types";

export const setTasks = (tasks) => ({
  type: taskActionTypes.SET_TASKS,
  payload: tasks,
});
