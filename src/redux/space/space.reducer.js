import spaceActionTypes from "./space.types";

const INITIAL_STATE = {
  spaceData: null,
  stationData: null,
};

const spaceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case spaceActionTypes.SET_SPACE_DATA:
      return {
        ...state,
        spaceData: action.payload,
      };
    case spaceActionTypes.REMOVE_SPACE_DATA:
      return {
        ...state,
        spaceData: action.payload,
      };
    case spaceActionTypes.SET_STATION_DATA:
      return {
        ...state,
        stationData: action.payload,
      };
    default:
      return state;
  }
};

export default spaceReducer;
