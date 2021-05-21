import { request } from "../../utils/request";
import { subscriptionActionTypes } from "./subscription.actionTypes";

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

export const listAllSubscriptions =
  (page, limit) => async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getState().core.login.userInfo.token}`,
        },
      };
      dispatch(
        requestAction(subscriptionActionTypes.SUBSCRIPTIONS_LIST_REQUEST)
      );
      const { data } = await request.get(
        `/api/subscriptions?page=${page}&limit=${limit}`,
        config
      );
      dispatch(
        successAction(subscriptionActionTypes.SUBSCRIPTIONS_LIST_SUCCESS, data)
      );
    } catch (error) {
      dispatch(
        failedAction(subscriptionActionTypes.SUBSCRIPTIONS_LIST_FAILED, error)
      );
    }
  };

export const addSubscription = (subscription) => async (dispatch, getState) => {
  const {
    member,
    type,
    courses,
    name,
    description,
    period,
    price,
    paid,
    isActive,
    startedAt,
    endsAt,
    paymentStatus,
  } = subscription;
  try {
    dispatch(
      requestAction(subscriptionActionTypes.CREATE_SUBSCRIPTION_REQUEST)
    );
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    const { data } = await request.post(
      "/api/subscriptions",
      {
        member,
        type,
        courses,
        name,
        description,
        period,
        price,
        paid,
        isActive,
        startedAt,
        endsAt,
        paymentStatus,
      },
      config
    );
    dispatch(
      successAction(subscriptionActionTypes.CREATE_SUBSCRIPTION_SUCCESS, data)
    );
  } catch (error) {
    dispatch(
      failedAction(subscriptionActionTypes.CREATE_SUBSCRIPTION_FAILED, error)
    );
  }
};

export const updateSubscription =
  ({ id, paid, isActive, paymentStatus }) =>
  async (dispatch, getState) => {
    try {
      dispatch(
        requestAction(subscriptionActionTypes.UPDATE_SUBSCRIPTION_REQUEST)
      );
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getState().core.login.userInfo.token}`,
        },
      };
      const { data } = await request.put(
        `/api/subscriptions/${id}`,
        {
          paid,
          isActive,
          paymentStatus,
        },
        config
      );
      dispatch(
        successAction(subscriptionActionTypes.UPDATE_SUBSCRIPTION_SUCCESS, data)
      );
    } catch (error) {
      dispatch(
        failedAction(subscriptionActionTypes.UPDATE_SUBSCRIPTION_FAILED, error)
      );
    }
  };

export const deleteSubscription = (id) => async (dispatch, getState) => {
  try {
    dispatch(
      requestAction(subscriptionActionTypes.DELETE_SUBSCRIPTION_REQUEST)
    );
    const config = {
      headers: {
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    await request.delete(`/api/subscriptions/${id}`, config);
    dispatch(
      successAction(subscriptionActionTypes.DELETE_SUBSCRIPTION_SUCCESS)
    );
    dispatch(listAllSubscriptions());
  } catch (error) {
    dispatch(
      failedAction(subscriptionActionTypes.DELETE_SUBSCRIPTION_FAILED, error)
    );
  }
};

export const selectSubscription = (id) => async (dispatch, getState) => {
  try {
    dispatch(
      requestAction(subscriptionActionTypes.SELECT_SUBSCRIPTION_REQUEST)
    );
    const config = {
      headers: {
        authorization: `Bearer ${getState().core.login.userInfo.token}`,
      },
    };
    const { data } = await request.get(`/api/subscriptions/${id}`, config);
    dispatch(
      successAction(subscriptionActionTypes.SELECT_SUBSCRIPTION_SUCCESS, data)
    );
  } catch (error) {
    dispatch(
      failedAction(subscriptionActionTypes.SELECT_SUBSCRIPTION_FAILED, error)
    );
  }
};
