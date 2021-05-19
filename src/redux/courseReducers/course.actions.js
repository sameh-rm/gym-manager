import { request } from "../../utils/request";
import { courseActionTypes } from "./course.actionTypes";

export const requestAction = (actionType) => ({
  type: actionType,
});

export const successAction = (actionType, payload) => {
  return {
    type: actionType,
    payload: payload,
  };
};

export const failedAction = (actionType, payload) => ({
  type: actionType,
  payload:
    payload.response && payload.response.data.message
      ? payload.response.data.message
      : payload.message,
});

export const listAllCourses = (page, limit) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    dispatch(requestAction(courseActionTypes.COURSES_LIST_REQUEST));
    const { data } = await request.get(
      `/api/courses?page=${page}&limit=${limit}`,
      config
    );
    dispatch(successAction(courseActionTypes.COURSES_LIST_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(courseActionTypes.COURSES_LIST_FAILED, error));
  }
};

export const addCourse = (course) => async (dispatch, getState) => {
  const {
    name,
    description,
    dailyPrice,
    monthlyPrice,
    daysPerMonth,
    minutesPerTime,
    period,
    plan,
  } = course;
  try {
    dispatch(requestAction(courseActionTypes.CREATE_COURSE_REQUEST));
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    const { data } = await request.post(
      "/api/courses",
      {
        name,
        description,
        dailyPrice,
        monthlyPrice,
        daysPerMonth,
        minutesPerTime,
        period,
        plan,
      },
      config
    );
    dispatch(successAction(courseActionTypes.CREATE_COURSE_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(courseActionTypes.CREATE_COURSE_FAILED, error));
  }
};

export const updateCourse =
  ({
    id,
    name,
    description,
    dailyPrice,
    monthlyPrice,
    daysPerMonth,
    minutesPerTime,
    isActive,
    plan,
  }) =>
  async (dispatch, getState) => {
    try {
      dispatch(requestAction(courseActionTypes.UPDATE_COURSE_REQUEST));
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getState().core.login.userInfo.token}`,
        },
      };
      const { data } = await request.put(
        `/api/courses/${id}`,
        {
          name,
          description,
          dailyPrice,
          monthlyPrice,
          daysPerMonth,
          minutesPerTime,
          isActive,
          plan,
        },
        config
      );
      dispatch(successAction(courseActionTypes.UPDATE_COURSE_SUCCESS, data));
    } catch (error) {
      dispatch(failedAction(courseActionTypes.UPDATE_COURSE_FAILED, error));
    }
  };

export const deleteCourse = (id) => async (dispatch, getState) => {
  try {
    dispatch(requestAction(courseActionTypes.DELETE_COURSE_REQUEST));
    const config = {
      headers: {
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    await request.delete(`/api/courses/${id}`, config);
    dispatch(successAction(courseActionTypes.DELETE_COURSE_SUCCESS));
    dispatch(listAllCourses());
  } catch (error) {
    dispatch(failedAction(courseActionTypes.DELETE_COURSE_FAILED, error));
  }
};

export const selectCourse = (id) => async (dispatch, getState) => {
  try {
    dispatch(requestAction(courseActionTypes.SELECT_COURSE_REQUEST));
    const config = {
      headers: {
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    const { data } = await request.get(`/api/courses/${id}`, config);
    dispatch(successAction(courseActionTypes.SELECT_COURSE_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(courseActionTypes.SELECT_COURSE_FAILED, error));
  }
};
