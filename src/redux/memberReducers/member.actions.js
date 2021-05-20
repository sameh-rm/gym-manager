import { request } from "../../utils/request";
import {
  buildSubscriptions,
  optionsToCourses,
  optionsToMemberShipCourses,
} from "../courseReducers/utils";
import { memberActionTypes } from "./member.actionTypes";

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

export const listAllMembers = (page, limit) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    dispatch(requestAction(memberActionTypes.MEMBERS_LIST_REQUEST));
    const { data } = await request.get(
      `/api/members?page=${page}&limit=${limit}`,
      config
    );
    dispatch(successAction(memberActionTypes.MEMBERS_LIST_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(memberActionTypes.MEMBERS_LIST_FAILED, error));
  }
};

export const addMember = (member) => async (dispatch, getState) => {
  const {
    name,
    image,
    age,
    tall,
    weight,
    phone,
    nationalId,
    membershipValue,
    coursesValues,
    personalAddress,
    payment,
  } = member;
  try {
    const courses = optionsToCourses(coursesValues);
    const subscriptions = buildSubscriptions(membershipValue.value, courses);

    dispatch(requestAction(memberActionTypes.CREATE_MEMBER_REQUEST));
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };

    const { data } = await request.post(
      "/api/members",
      {
        name,
        image,
        age,
        tall,
        weight,
        phone,
        nationalId,
        subscriptions,
        personalAddress,
        paid: payment,
      },
      config
    );
    dispatch(successAction(memberActionTypes.CREATE_MEMBER_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(memberActionTypes.CREATE_MEMBER_FAILED, error));
  }
};

export const updateMember =
  ({
    id,
    name,
    image,
    age,
    tall,
    weight,
    phone,
    nationalId,
    personalAddress,
    isActive,
  }) =>
  async (dispatch, getState) => {
    try {
      dispatch(requestAction(memberActionTypes.UPDATE_MEMBER_REQUEST));
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getState().core.login.userInfo.token}`,
        },
      };
      console.log(isActive);
      const { data } = await request.put(
        `/api/members/${id}`,
        {
          name,
          image,
          age,
          tall,
          weight,
          phone,
          nationalId,
          personalAddress,
          isActive,
        },
        config
      );
      dispatch(successAction(memberActionTypes.UPDATE_MEMBER_SUCCESS, data));
    } catch (error) {
      dispatch(failedAction(memberActionTypes.UPDATE_MEMBER_FAILED, error));
    }
  };

export const deleteMember = (id) => async (dispatch, getState) => {
  try {
    dispatch(requestAction(memberActionTypes.DELETE_MEMBER_REQUEST));
    const config = {
      headers: {
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    await request.delete(`/api/members/${id}`, config);
    dispatch(successAction(memberActionTypes.DELETE_MEMBER_SUCCESS));
  } catch (error) {
    dispatch(failedAction(memberActionTypes.DELETE_MEMBER_FAILED, error));
  }
};

export const selectMember = (id) => async (dispatch, getState) => {
  try {
    dispatch(requestAction(memberActionTypes.SELECT_MEMBER_REQUEST));
    const config = {
      headers: {
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    const { data } = await request.get(`/api/members/${id}`, config);
    dispatch(successAction(memberActionTypes.SELECT_MEMBER_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(memberActionTypes.SELECT_MEMBER_FAILED, error));
  }
};

export const initMember = (member) => ({
  type: memberActionTypes.INIT_MEMBER,
  payload: member,
});
