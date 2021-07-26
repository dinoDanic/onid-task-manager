import historyActionTypes from "./history.types";

const initialState = {
  spaceId: null,
  stationId: null,
  isLoading: true,
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case historyActionTypes.SET_SPACE_ID:
      return {
        ...state,
        spaceId: action.payload,
      };
    case historyActionTypes.SET_STATION_ID:
      return {
        ...state,
        stationId: action.payload,
      };
    case historyActionTypes.SET_IDS_NULL:
      return {
        spaceId: null,
        stationId: null,
      };
    case historyActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default historyReducer;
