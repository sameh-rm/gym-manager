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
        usersList: action.payload.results,
        prev: action.payload.prev,
        next: action.payload.next,
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

export const configReducer = (state = {}, action) => {
  const date = new Date();
  const startDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    "05",
    "00",
    "00"
  );
  const endDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1,
    "05",
    "59",
    "59"
  );
  switch (action.type) {
    case adminActionTypes.DATE_RANGE:
      return {
        startDate: startDate,
        endDate: endDate,
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
        success: true,
      };
    case adminActionTypes.CREATE_USER_FAILED:
      return {
        error: action.payload,
        loading: false,
        success: false,

        createdUser: {},
      };
    case "RESET_ADD_USER_FORM":
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const updateUserReducer = (
  state = {
    success: false,
  },
  action
) => {
  switch (action.type) {
    case adminActionTypes.UPDATE_USER_REQUEST:
      return {
        updatedUser: {},
        loading: true,
        success: false,
      };
    case adminActionTypes.UPDATE_USER_SUCCESS:
      return {
        updatedUser: action.payload,
        loading: false,
        success: true,
      };
    case adminActionTypes.UPDATE_USER_FAILED:
      return {
        error: action.payload,
        loading: false,
        success: false,

        updatedUser: {},
      };
    case "RESET_USER_FORM":
      return {
        success: false,
        updatedUser: action.payload,
      };

    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case adminActionTypes.DELETE_USER_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case adminActionTypes.DELETE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case adminActionTypes.DELETE_USER_FAILED:
      return {
        success: false,
        loading: false,
        error: action.payload,
      };
    case "RESET_DELETE_USER":
      return {
        success: false,
      };
    default:
      return {};
  }
};

const page_rows_count = 5;
export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case adminActionTypes.LOGIN_REQUEST:
      return {
        page_rows_count: page_rows_count,
        loading: true,
      };
    case adminActionTypes.LOGIN_SUCCESS:
      return {
        page_rows_count: page_rows_count,

        userInfo: action.payload,
        loading: false,
      };
    case adminActionTypes.LOGIN_FAILED:
      return {
        page_rows_count: page_rows_count,

        error: action.payload,
        loading: false,
      };

    case adminActionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
};

export const selectUserReducer = (
  state = {
    user: null,
  },
  action
) => {
  switch (action.type) {
    case adminActionTypes.SELECT_USER_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case adminActionTypes.SELECT_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case adminActionTypes.SELECT_USER_FAILED:
      return {
        success: false,
        loading: false,
        error: action.payload,
      };
    case adminActionTypes.RESET_SELECT_USER:
      return {
        success: false,
      };
    default:
      return state;
  }
};
