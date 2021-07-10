import UserActionTypes from "./user.types";

export const setUser = (userData) => ({
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
