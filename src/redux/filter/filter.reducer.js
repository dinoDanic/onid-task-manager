import FilterType from "./filter.type";

const INITIAL_STATE = {
  status: [
    { name: "urgent", status: false },
    { name: "high", status: false },
    { name: "normal", status: false },
    { name: "low", status: false },
  ],
  time: null,
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FilterType.SET_FILTER_NULL:
      return {};
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
    default:
      return state;
  }
};

export default filterReducer;
