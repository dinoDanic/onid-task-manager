import spaceActionTypes from "./space.types";

const INITIAL_STATE = {
  spaceData: null,
};

const spaceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case spaceActionTypes.SET_SPACE_DATA:
      return {
        ...state,
        spaceData: action.payload,
      };
    default:
      return state;
  }
};

export default spaceReducer;
