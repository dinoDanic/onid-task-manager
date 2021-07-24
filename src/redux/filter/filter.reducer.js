import FilterType from "./filter.type";

const INITIAL_STATE = {
  status: [
    { name: "urgent", status: false },
    { name: "high", status: false },
    { name: "normal", status: false },
    { name: "low", status: false },
  ],
  time: null,
  timeZone: {},
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FilterType.SET_FILTER_NULL:
      return {
        status: [
          { name: "urgent", status: false },
          { name: "high", status: false },
          { name: "normal", status: false },
          { name: "low", status: false },
        ],
        time: null,
        timeZone: {
          ...state.timeZone,
        },
      };
    case FilterType.TOGGLE_STATUS:
      const i = state.status.findIndex((item) => item.name === action.payload);
      const currentState = state.status[i].status;
      state.status[i].status = !currentState;
      return {
        ...state,
      };
    case FilterType.TOGGLE_TIME:
      let newTime = null;
      if (state.time === action.payload) {
        newTime = null;
      } else {
        newTime = action.payload;
      }
      return {
        ...state,
        time: newTime,
      };
    case FilterType.SET_TIME_ZONE:
      const { taskId, zone } = action.payload;
      return {
        ...state,
        timeZone: {
          ...state.timeZone,
          [taskId]: {
            zone: zone,
          },
        },
      };
    default:
      return state;
  }
};

export default filterReducer;
