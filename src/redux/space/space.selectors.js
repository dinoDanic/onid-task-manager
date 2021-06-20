import { createSelector } from "reselect";

const selectSpace = (state) => state.space;

export const selectSpaceData = createSelector(
  [selectSpace],
  (space) => space.spaceData
);
