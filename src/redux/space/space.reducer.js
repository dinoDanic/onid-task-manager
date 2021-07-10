import spaceActionTypes from "./space.types";

const INITIAL_STATE = {
  spaceData: [],
  stationData: null,
  moduleData: [],
  activeModulesData: [],
  statusType: null,
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
      console.log(state);
      let filtered = state.spaceData.filter(
        (space) => space.spaceId !== action.payload
      );
      return {
        ...state,
        spaceData: filtered,
      };
    case spaceActionTypes.SET_MODULES:
      return {
        ...state,
        moduleData: action.payload,
      };
    case spaceActionTypes.SET_ACTIVE_MODULES:
      return {
        ...state,
        activeModulesData: action.payload,
      };
    case spaceActionTypes.SET_STATUS_TYPE:
      return {
        ...state,
        statusType: action.payload,
      };
    default:
      return state;
  }
};

export default spaceReducer;
