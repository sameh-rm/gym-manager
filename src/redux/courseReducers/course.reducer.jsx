import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import { courseActionTypes } from "./course.actionTypes";
import storage from "redux-persist/lib/storage";
import { coursesToOptions } from "./utils";

const initState = {
  coursesList: [],
};
const coursesListReducer = (state = initState, action) => {
  switch (action.type) {
    case courseActionTypes.COURSES_LIST_REQUEST:
      return {
        coursesList: [],
        loading: true,
      };
    case courseActionTypes.COURSES_LIST_SUCCESS:
      return {
        coursesList: action.payload.results,
        coursesAsOptions: coursesToOptions(action.payload.results),
        prev: action.payload.prev,
        next: action.payload.next,
        loading: false,
      };
    case courseActionTypes.COURSES_LIST_FAILED:
      return {
        error: action.payload,
        loading: false,
        coursesList: [],
      };

    default:
      return state;
  }
};

const addcourseReducer = (state = {}, action) => {
  switch (action.type) {
    case courseActionTypes.CREATE_COURSE_REQUEST:
      return {
        createdcourse: {},
        loading: true,
      };
    case courseActionTypes.CREATE_COURSE_SUCCESS:
      return {
        createdcourse: action.payload,
        loading: false,
        success: true,
      };
    case courseActionTypes.CREATE_COURSE_FAILED:
      return {
        error: action.payload,
        loading: false,
        success: false,

        createdcourse: {},
      };
    case "RESET_ADD_COURSE_FORM":
      return {
        success: false,
      };
    default:
      return state;
  }
};

const updatecourseReducer = (
  state = {
    success: false,
  },
  action
) => {
  switch (action.type) {
    case courseActionTypes.UPDATE_COURSE_REQUEST:
      return {
        updatedcourse: {},
        loading: true,
        success: false,
      };
    case courseActionTypes.UPDATE_COURSE_SUCCESS:
      return {
        updatedcourse: action.payload,
        loading: false,
        success: true,
      };
    case courseActionTypes.UPDATE_COURSE_FAILED:
      return {
        error: action.payload,
        loading: false,
        success: false,

        updatedcourse: {},
      };
    case "RESET_COURSE_FORM":
      return {
        success: false,
        updatedcourse: action.payload,
      };

    default:
      return state;
  }
};

const deletecourseReducer = (state = {}, action) => {
  switch (action.type) {
    case courseActionTypes.DELETE_COURSE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case courseActionTypes.DELETE_COURSE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case courseActionTypes.DELETE_COURSE_FAILED:
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
    course: null,
  },
  action
) => {
  switch (action.type) {
    case courseActionTypes.SELECT_COURSE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case courseActionTypes.SELECT_COURSE_SUCCESS:
      return {
        loading: false,
        course: action.payload,
      };
    case courseActionTypes.SELECT_COURSE_FAILED:
      return {
        success: false,
        loading: false,
        error: action.payload,
      };
    case courseActionTypes.RESET_SELECT_COURSE:
      return {
        success: false,
      };
    default:
      return state;
  }
};

const coursePersistConfig = {
  key: "course",
  storage,
  whitelist: [""],
};

const courseReducers = persistReducer(
  coursePersistConfig,
  combineReducers({
    coursesList: coursesListReducer,
    selectCourse: selectCourseReducer,
    addCourse: addcourseReducer,
    updateCourse: updatecourseReducer,
    deleteCourse: deletecourseReducer,
  })
);

export default courseReducers;
