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

export const setModules = (moduleData) => ({
  type: spaceActionTypes.SET_MODULES,
  payload: moduleData,
});

export const setActiveModules = (moduleData) => ({
  type: spaceActionTypes.SET_ACTIVE_MODULES,
  payload: moduleData,
});

export const setStatusType = (statusType) => ({
  type: spaceActionTypes.SET_STATUS_TYPE,
  payload: statusType,
});

export const logOut = () => ({
  type: spaceActionTypes.LOG_OUT,
});

export const setOpen = (state) => ({
  type: spaceActionTypes.SET_OPEN,
  payload: state,
});
