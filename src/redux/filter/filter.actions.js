import FilterType from "./filter.type";

export const setFilterNull = () => ({
  type: FilterType.SET_FILTER_NULL,
});

export const toggleStatus = (state) => ({
  type: FilterType.TOGGLE_STATUS,
  payload: state,
});

export const toggleTime = (state) => ({
  type: FilterType.TOGGLE_TIME,
  payload: state,
});

export const setTimeZone = (state) => ({
  type: FilterType.SET_TIME_ZONE,
  payload: state,
});
