import UserActionTypes from "./user.types";

export const signIn = (userData) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: userData,
});

export const setFavoriteStation = (favoriteStationId) => ({
  type: UserActionTypes.SET_FAVORITE_STATION,
  payload: favoriteStationId,
});

export const signOut = () => ({
  type: UserActionTypes.SET_CURRENT_USER_NULL,
});

export const setUsers = (users) => ({
  type: UserActionTypes.SET_USERS,
  payload: users,
});

export const removeOneFavoriteStation = (stationId) => ({
  type: UserActionTypes.REMOVE_ONE_STATION,
  payload: stationId,
});
export const addOneFavoriteStation = (stationId) => ({
  type: UserActionTypes.ADD_ONE_STATION,
  payload: stationId,
});
