import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import { expincActionTypes } from "./expinc.actionTypes";
import storage from "redux-persist/lib/storage";

const initState = {
  expincsList: [],
};
const expincsListReducer = (state = initState, action) => {
  switch (action.type) {
    case expincActionTypes.EXPINCS_LIST_REQUEST:
      return {
        expincsList: [],
        loading: true,
      };
    case expincActionTypes.EXPINCS_LIST_SUCCESS:
      return {
        expincsList: action.payload.results,
        prev: action.payload.prev,
        next: action.payload.next,
        loading: false,
      };
    case expincActionTypes.EXPINCS_LIST_FAILED:
      return {
        error: action.payload,
        loading: false,
        expincsList: [],
      };

    default:
      return state;
  }
};

const addexpincReducer = (state = {}, action) => {
  switch (action.type) {
    case expincActionTypes.CREATE_EXPINC_REQUEST:
      return {
        createdexpinc: {},
        loading: true,
      };
    case expincActionTypes.CREATE_EXPINC_SUCCESS:
      return {
        createdexpinc: action.payload,
        loading: false,
        success: true,
      };
    case expincActionTypes.CREATE_EXPINC_FAILED:
      return {
        error: action.payload,
        loading: false,
        success: false,

        createdexpinc: {},
      };
    case "RESET_ADD_EXPINC_FORM":
      return {
        success: false,
      };
    default:
      return state;
  }
};

const updateexpincReducer = (
  state = {
    success: false,
  },
  action
) => {
  switch (action.type) {
    case expincActionTypes.UPDATE_EXPINC_REQUEST:
      return {
        updatedexpinc: {},
        loading: true,
        success: false,
      };
    case expincActionTypes.UPDATE_EXPINC_SUCCESS:
      return {
        updatedexpinc: action.payload,
        loading: false,
        success: true,
      };
    case expincActionTypes.UPDATE_EXPINC_FAILED:
      return {
        error: action.payload,
        loading: false,
        success: false,

        updatedexpinc: {},
      };
    case "RESET_EXPINC_FORM":
      return {
        success: false,
        updatedexpinc: action.payload,
      };

    default:
      return state;
  }
};

const deleteexpincReducer = (state = {}, action) => {
  switch (action.type) {
    case expincActionTypes.DELETE_EXPINC_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case expincActionTypes.DELETE_EXPINC_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case expincActionTypes.DELETE_EXPINC_FAILED:
      return {
        success: false,
        loading: false,
        error: action.payload,
      };
    case "RESET":
      return {
        success: false,
      };
    default:
      return state;
  }
};

const selectCourseReducer = (
  state = {
    expinc: null,
  },
  action
) => {
  switch (action.type) {
    case expincActionTypes.SELECT_EXPINC_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case expincActionTypes.SELECT_EXPINC_SUCCESS:
      return {
        loading: false,
        expinc: action.payload,
      };
    case expincActionTypes.SELECT_EXPINC_FAILED:
      return {
        success: false,
        loading: false,
        error: action.payload,
      };
    case expincActionTypes.RESET_SELECT_EXPINC:
      return {
        success: false,
      };
    default:
      return state;
  }
};

const expincPersistConfig = {
  key: "expinc",
  storage,
  whitelist: [""],
};

const expincReducers = persistReducer(
  expincPersistConfig,
  combineReducers({
    expincsList: expincsListReducer,
    selectCourse: selectCourseReducer,
    addCourse: addexpincReducer,
    updateCourse: updateexpincReducer,
    deleteCourse: deleteexpincReducer,
  })
);

export default expincReducers;