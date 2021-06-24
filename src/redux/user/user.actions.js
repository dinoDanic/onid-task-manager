import UserActionTypes from "./user.types";

export const signIn = (userData) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: userData,
});

export const setFavoriteSpace = (favoriteSpaceId) => ({
  type: UserActionTypes.SET_FAVORITE_SPACE,
  payload: favoriteSpaceId,
});

export const signOut = () => ({
  type: UserActionTypes.SET_CURRENT_USER_NULL,
});

export const setUsers = (users) => ({
  type: UserActionTypes.SET_USERS,
  payload: users,
});
