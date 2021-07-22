import FilterType from "./filter.type";

const INITIAL_STATE = {
  status: [
    { name: "urgent", status: true },
    { name: "high", status: true },
  ],
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FilterType.SET_FILTER_NULL:
      return {};
    case FilterType.TOGGLE_URGENT:
      const i = state.status.findIndex((item) => item.name === action.payload);
      const currentState = state.status[i].status;
      console.log(currentState);
      state.status[i].status = !currentState;
      console.log(state);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default filterReducer;
