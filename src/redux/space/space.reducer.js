import spaceActionTypes from "./space.types";

const INITIAL_STATE = {
  spaceData: [],
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
    case spaceActionTypes.REMOVE_ONE_SPACE:
      let filtered = state.stationData.filter(
        (space) => space !== action.payload
      );

      return {
        ...state,
        spaceData: filtered,
      };
    default:
      return state;
  }
};

export default spaceReducer;
