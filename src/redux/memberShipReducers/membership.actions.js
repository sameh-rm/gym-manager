import { request } from "../../utils/request";
import { optionsToCourses } from "../courseReducers/utils";
import { membershipActionTypes } from "./membership.actionTypes";

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

export const listAllMemberShips =
  (page, limit) => async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getState().core.login.userInfo.token}`,
        },
      };
      dispatch(requestAction(membershipActionTypes.MEMBERSHIPS_LIST_REQUEST));
      const { data } = await request.get(
        `/api/memberships?page=${page}&limit=${limit}`,
        config
      );
      dispatch(
        successAction(membershipActionTypes.MEMBERSHIPS_LIST_SUCCESS, data)
      );
    } catch (error) {
      dispatch(
        failedAction(membershipActionTypes.MEMBERSHIPS_LIST_FAILED, error)
      );
    }
  };

export const addMembership = (membership) => async (dispatch, getState) => {
  const { name, description, price, period, isActive, coursesValues, plan } =
    membership;
  try {
    dispatch(requestAction(membershipActionTypes.CREATE_MEMBERSHIP_REQUEST));
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    const courses = optionsToCourses(coursesValues);

    const { data } = await request.post(
      "/api/memberships",
      {
        name,
        description,
        price,
        period,
        isActive,
        courses,
        plan,
      },
      config
    );
    dispatch(
      successAction(membershipActionTypes.CREATE_MEMBERSHIP_SUCCESS, data)
    );
  } catch (error) {
    dispatch(
      failedAction(membershipActionTypes.CREATE_MEMBERSHIP_FAILED, error)
    );
  }
};

export const updateMemberShip =
  ({ id, name, description, price, period, isActive, coursesValues, plan }) =>
  async (dispatch, getState) => {
    try {
      dispatch(requestAction(membershipActionTypes.UPDATE_MEMBERSHIP_REQUEST));
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getState().core.login.userInfo.token}`,
        },
      };
      const courses = optionsToCourses(coursesValues);

      const { data } = await request.put(
        `/api/memberships/${id}`,
        {
          name,
          description,
          price,
          period,
          isActive,
          courses,
          plan,
        },
        config
      );
      dispatch(
        successAction(membershipActionTypes.UPDATE_MEMBERSHIP_SUCCESS, data)
      );
    } catch (error) {
      dispatch(
        failedAction(membershipActionTypes.UPDATE_MEMBERSHIP_FAILED, error)
      );
    }
  };

export const deleteMemberShip = (id) => async (dispatch, getState) => {
  try {
    dispatch(requestAction(membershipActionTypes.DELETE_MEMBERSHIP_REQUEST));
    const config = {
      headers: {
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    await request.delete(`/api/memberships/${id}`, config);
    dispatch(successAction(membershipActionTypes.DELETE_MEMBERSHIP_SUCCESS));
    dispatch(listAllMemberShips());
  } catch (error) {
    dispatch(
      failedAction(membershipActionTypes.DELETE_MEMBERSHIP_FAILED, error)
    );
  }
};

export const selectMemberShip = (id) => async (dispatch, getState) => {
  try {
    dispatch(requestAction(membershipActionTypes.SELECT_MEMBERSHIP_REQUEST));
    const config = {
      headers: {
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    const { data } = await request.get(`/api/memberships/${id}`, config);
    dispatch(
      successAction(membershipActionTypes.SELECT_MEMBERSHIP_SUCCESS, data)
    );
  } catch (error) {
    dispatch(
      failedAction(membershipActionTypes.SELECT_MEMBERSHIP_FAILED, error)
    );
  }
};

export const initMemberShip = (membership) => ({
  type: membershipActionTypes.INIT_MEMBERSHIP,
  payload: membership,
});
