import { combineReducers } from "redux";

import spaceReducer from "./space/space.reducer";
import userReducer from "./user/user.reducer";
import historyReducer from "./history/history.reducer";
import taskReducer from "./tasks/tasks.reducer";

const rootReducer = combineReducers({
  space: spaceReducer,
  user: userReducer,
  history: historyReducer,
  tasks: taskReducer,
});

export default rootReducer;
