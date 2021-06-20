import spaceActionTypes from "./space.types";

export const setSpaceData = (spaceData) => ({
  type: spaceActionTypes.SET_SPACE_DATA,
  payload: spaceData,
});
