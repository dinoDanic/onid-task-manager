import UserActionTypes from "./user.types";
const INITIAL_STATE = {
  currentUser: null,
  users: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.SET_CURRENT_USER_NULL:
      return {
        ...state,
        currentUser: null,
      };
    case UserActionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case UserActionTypes.SET_FAVORITE_SPACE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          favoriteSpace: action.payload,
        },
      };
    /* return {
        ...state,
        currentUser: action.payload,
      }; */
    default:
      return state;
  }
};

export default userReducer;
