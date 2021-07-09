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
    case UserActionTypes.SET_FAVORITE_STATION:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          favoriteSpace: action.payload,
        },
      };
    case UserActionTypes.REMOVE_ONE_STATION:
      let allFavIds = state.currentUser.favoriteStations;
      let removeId = allFavIds.filter((item) => item !== action.payload);
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          favoriteStations: removeId,
        },
      };
    case UserActionTypes.ADD_ONE_STATION:
      let addOne = state.currentUser.favoriteStations;
      addOne.push(action.payload);
      console.log(addOne);
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          favoriteStations: addOne,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
