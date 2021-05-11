import { courseActionTypes } from "./course.actionTypes";

const initState = {
  coursesList: [],
};

export const coursesListReducer = (state = initState, action) => {
  switch (action.type) {
    case courseActionTypes.COURSES_LIST_REQUEST:
      return {
        coursesList: [],
        loading: true,
      };
    case courseActionTypes.COURSES_LIST_SUCCESS:
      return {
        coursesList: action.payload.results,
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

export const addcourseReducer = (state = {}, action) => {
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

export const updatecourseReducer = (
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

export const deletecourseReducer = (state = {}, action) => {
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
      return {};
  }
};
