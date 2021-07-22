import UserActionTypes from "./user.types";
const INITIAL_STATE = {
  currentUser: null,
  favoriteSpaces: {
    open: true,
  },
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
        favoriteSpaces: {},
        users: null,
      };
    case UserActionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case UserActionTypes.SET_OPEN:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          open: action.payload,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
