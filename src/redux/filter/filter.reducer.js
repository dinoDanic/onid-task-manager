import FilterType from "./filter.type";

const INITIAL_STATE = {
  status: [
    { name: "urgent", status: false },
    { name: "high", status: false },
    { name: "normal", status: false },
    { name: "low", status: false },
  ],
  time: [
    { name: 0, status: false },
    { name: 1, status: false },
    { name: 7, status: false },
    { name: 30, status: false },
    // PRESELI IZ TEKST  U DANE. 1. UPDEJTAJ DA SALJE DOBRO U DB.
  ],
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
      const iT = state.time.findIndex((item) => item.name === action.payload);
      const currentStateTime = state.time[iT].status;
      state.time[iT].status = !currentStateTime;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default filterReducer;
