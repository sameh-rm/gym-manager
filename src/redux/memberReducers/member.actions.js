import { request } from "../../utils/request";
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
    nationalID,
    memberShips,
    courses,
  } = member;
  try {
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
        nationalID,
        memberShips,
        courses,
      },
      config
    );
    dispatch(successAction(memberActionTypes.CREATE_MEMBER_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(memberActionTypes.CREATE_MEMBER_FAILED, error));
  }
};

export const updatemember = ({
  id,
  name,
  image,
  age,
  tall,
  weight,
  phone,
  nationalID,
  memberShips,
  courses,
}) => async (dispatch, getState) => {
  try {
    dispatch(requestAction(memberActionTypes.UPDATE_MEMBER_REQUEST));
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    const { data } = await request.put(
      `/api/members/${id}`,
      {
        name,
        image,
        age,
        tall,
        weight,
        phone,
        nationalID,
        memberShips,
        courses,
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
    dispatch(listAllMembers());
  } catch (error) {
    dispatch(failedAction(memberActionTypes.DELETE_MEMBER_FAILED, error));
  }
};
