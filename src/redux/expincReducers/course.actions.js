import { request } from "../../utils/request";
import { expIncActionTypes } from "./expInc.actionTypes";

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

export const listAllExpIncs = (page, limit) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    dispatch(requestAction(expIncActionTypes.EXPINCS_LIST_REQUEST));
    const { data } = await request.get(
      `/api/expenses?page=${page}&limit=${limit}`,
      config
    );
    dispatch(successAction(expIncActionTypes.EXPINCS_LIST_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(expIncActionTypes.EXPINCS_LIST_FAILED, error));
  }
};

export const addExpInc = (expInc) => async (dispatch, getState) => {
  const {
    description,
    value,
    inOut,
    member,
    subscription,
    user,
    createdAt,
    updatedAt,
    confirmed,
  } = expInc;
  try {
    dispatch(requestAction(expIncActionTypes.CREATE_EXPINC_REQUEST));
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    const { data } = await request.post(
      "/api/expenses",
      {
        description,
        value,
        inOut,
        member,
        subscription,
        user,
        createdAt,
        updatedAt,
        confirmed,
      },
      config
    );
    dispatch(successAction(expIncActionTypes.CREATE_EXPINC_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(expIncActionTypes.CREATE_EXPINC_FAILED, error));
  }
};

export const updateExpInc =
  ({
    id,
    description,
    value,
    inOut,
    member,
    subscription,
    user,
    createdAt,
    updatedAt,
    confirmed,
  }) =>
  async (dispatch, getState) => {
    try {
      dispatch(requestAction(expIncActionTypes.UPDATE_EXPINC_REQUEST));
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getState().core.login.userInfo.token}`,
        },
      };
      const { data } = await request.put(
        `/api/expenses/${id}`,
        {
          description,
          value,
          inOut,
          member,
          subscription,
          user,
          createdAt,
          updatedAt,
          confirmed,
        },
        config
      );
      dispatch(successAction(expIncActionTypes.UPDATE_EXPINC_SUCCESS, data));
    } catch (error) {
      dispatch(failedAction(expIncActionTypes.UPDATE_EXPINC_FAILED, error));
    }
  };

export const deleteExpInc = (id) => async (dispatch, getState) => {
  try {
    dispatch(requestAction(expIncActionTypes.DELETE_EXPINC_REQUEST));
    const config = {
      headers: {
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    await request.delete(`/api/expenses/${id}`, config);
    dispatch(successAction(expIncActionTypes.DELETE_EXPINC_SUCCESS));
    dispatch(listAllExpIncs());
  } catch (error) {
    dispatch(failedAction(expIncActionTypes.DELETE_EXPINC_FAILED, error));
  }
};

export const selectExpInc = (id) => async (dispatch, getState) => {
  try {
    dispatch(requestAction(expIncActionTypes.SELECT_EXPINC_REQUEST));
    const config = {
      headers: {
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    const { data } = await request.get(`/api/expenses/${id}`, config);
    dispatch(successAction(expIncActionTypes.SELECT_EXPINC_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(expIncActionTypes.SELECT_EXPINC_FAILED, error));
  }
};
