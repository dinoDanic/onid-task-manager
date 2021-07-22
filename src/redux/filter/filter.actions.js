import FilterType from "./filter.type";

export const setFilterNull = () => ({
  type: FilterType.SET_FILTER_NULL,
});

export const toggleUrgent = (state) => ({
  type: FilterType.TOGGLE_URGENT,
  payload: state,
});
