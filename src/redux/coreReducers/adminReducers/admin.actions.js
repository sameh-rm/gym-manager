import { request } from "../../../utils/request";
import { adminActionTypes } from "./admin.actionTypes";

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

export const listAllUsers = (page, limit) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    dispatch(requestAction(adminActionTypes.USERS_LIST_REQUEST));
    const { data } = await request.get(
      `/api/users?page=${page}&limit=${limit}`,
      config
    );
    dispatch(successAction(adminActionTypes.USERS_LIST_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(adminActionTypes.USERS_LIST_FAILED, error));
  }
};

export const addUser = ({
  name,
  image,
  username,
  password,
  isAdmin,
  permissions,
  permissionGroups,
}) => async (dispatch, getState) => {
  try {
    dispatch(requestAction(adminActionTypes.CREATE_USER_REQUEST));
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    const { data } = await request.post(
      "/api/users",
      {
        name,
        image,
        username,
        password,
        isAdmin,
        // permissions,
        // permissionGroups,
      },
      config
    );
    dispatch(successAction(adminActionTypes.CREATE_USER_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(adminActionTypes.CREATE_USER_FAILED, error));
  }
};

export const updateUser = ({
  id,
  name,
  image,
  username,
  password,
  isAdmin,
  permissions,
  permissionGroups,
}) => async (dispatch, getState) => {
  console.log(permissions, permissionGroups);
  try {
    dispatch(requestAction(adminActionTypes.UPDATE_USER_REQUEST));
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    const { data } = await request.put(
      `/api/users/${id}`,
      {
        name,
        image,
        username,
        password,
        isAdmin,
        // permissions,
        // permissionGroups,
      },
      config
    );
    dispatch(successAction(adminActionTypes.UPDATE_USER_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(adminActionTypes.UPDATE_USER_FAILED, error));
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch(requestAction(adminActionTypes.DELETE_USER_REQUEST));
    const config = {
      headers: {
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    await request.delete(`/api/users/${id}`, config);
    dispatch(successAction(adminActionTypes.DELETE_USER_SUCCESS));
    dispatch(listAllUsers());
  } catch (error) {
    dispatch(failedAction(adminActionTypes.DELETE_USER_FAILED, error));
  }
};

export const login = (username, password) => async (dispatch, getState) => {
  try {
    dispatch(requestAction(adminActionTypes.LOGIN_REQUEST));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await request.post(
      "/api/users/login",
      {
        username,
        password,
      },
      config
    );
    dispatch(successAction(adminActionTypes.LOGIN_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(adminActionTypes.LOGIN_FAILED, error));
  }
};
