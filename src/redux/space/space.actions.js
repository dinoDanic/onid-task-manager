import spaceActionTypes from "./space.types";

export const setSpaceData = (spaceData) => ({
  type: spaceActionTypes.SET_SPACE_DATA,
  payload: spaceData,
});

export const removeSpaceData = () => ({
  type: spaceActionTypes.REMOVE_SPACE_DATA,
  payload: null,
});

export const setStationData = (stationData) => ({
  type: spaceActionTypes.SET_STATION_DATA,
  payload: stationData,
});

export const removeOneSpace = (spaceId) => ({
  type: spaceActionTypes.REMOVE_ONE_SPACE,
  payload: spaceId,
});
