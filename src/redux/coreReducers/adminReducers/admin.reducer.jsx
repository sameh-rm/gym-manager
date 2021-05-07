import { adminActionTypes } from "./admin.actionTypes";

const initState = {
  usersList: [],
};

export const usersListReducer = (state = initState, action) => {
  switch (action.type) {
    case adminActionTypes.USERS_LIST_REQUEST:
      return {
        usersList: [],
        loading: true,
      };
    case adminActionTypes.USERS_LIST_SUCCESS:
      return {
        usersList: action.payload,
        loading: false,
      };
    case adminActionTypes.USERS_LIST_FAILED:
      return {
        error: action.payload,
        loading: false,
        usersList: [],
      };
    default:
      return state;
  }
};

export const addUserReducer = (state = {}, action) => {
  switch (action.type) {
    case adminActionTypes.CREATE_USER_REQUEST:
      return {
        createdUser: {},
        loading: true,
      };
    case adminActionTypes.CREATE_USER_SUCCESS:
      return {
        createdUser: action.payload,
        loading: false,
      };
    case adminActionTypes.CREATE_USER_FAILED:
      return {
        error: action.payload,
        loading: false,
        createdUser: {},
      };
    default:
      return state;
  }
};

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case adminActionTypes.LOGIN_REQUEST:
      return {
        loading: true,
      };
    case adminActionTypes.LOGIN_SUCCESS:
      return {
        userInfo: action.payload,
        loading: false,
      };
    case adminActionTypes.LOGIN_FAILED:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
