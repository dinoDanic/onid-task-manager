import { combineReducers } from "redux";

import spaceReducer from "./space/space.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  space: spaceReducer,
  user: userReducer,
});

export default rootReducer;
