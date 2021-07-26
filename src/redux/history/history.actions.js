import historyActionTypes from "./history.types";

export const setSpaceId = (spaceId) => ({
  type: historyActionTypes.SET_SPACE_ID,
  payload: spaceId,
});

export const setStationId = (stationId) => ({
  type: historyActionTypes.SET_STATION_ID,
  payload: stationId,
});

export const setIdsNull = () => ({
  type: historyActionTypes.SET_IDS_NULL,
});

export const setLoading = (state) => ({
  type: historyActionTypes.SET_LOADING,
  payload: state,
});
