import taskActionTypes from "./tasks.types";

const INITIAL_STATE = {
  tasks: [],
};

const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case taskActionTypes.SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
