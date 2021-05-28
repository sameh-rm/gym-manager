import { request } from "../../utils/request";
import { listMemberSubscriptions } from "../memberReducers/member.actions";
import { subscriptionActionTypes } from "./subscriptions.actionTypes";

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

export const listAllExpiredSubscriptions =
  (page, limit) => async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getState().core.login.userInfo.token}`,
        },
      };
      dispatch(
        requestAction(
          subscriptionActionTypes.EXPIRED_SUBSCRIPTIONS_LIST_REQUEST
        )
      );
      const { data } = await request.get(
        `/api/subscriptions/expired?page=${page}&limit=${limit}`,
        config
      );
      dispatch(
        successAction(
          subscriptionActionTypes.EXPIRED_SUBSCRIPTIONS_LIST_SUCCESS,
          data
        )
      );
    } catch (error) {
      dispatch(
        failedAction(
          subscriptionActionTypes.EXPIRED_SUBSCRIPTIONS_LIST_FAILED,
          error
        )
      );
    }
  };

export const listAllSubscriptionsInDateRange =
  (page, limit) => async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getState().core.login.userInfo.token}`,
        },
      };
      dispatch(
        requestAction(
          subscriptionActionTypes.SUBSCRIPTIONS_INDATE_RANGE_REQUEST
        )
      );

      const { data } = await request.get(
        `/api/subscriptions/subs-range?start_date=${
          getState().core.config.startDate
        }&end_date=${
          getState().core.config.endDate
        }&page=${page}&limit=${limit}`,
        config
      );

      dispatch(
        successAction(
          subscriptionActionTypes.SUBSCRIPTIONS_INDATE_RANGE_SUCCESS,
          data
        )
      );
    } catch (error) {
      dispatch(
        failedAction(
          subscriptionActionTypes.SUBSCRIPTIONS_INDATE_RANGE_FAILED,
          error
        )
      );
    }
  };

export const listDailySubsInDateRange =
  (page, limit) => async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getState().core.login.userInfo.token}`,
        },
      };
      dispatch(
        requestAction(subscriptionActionTypes.DAILYSUBS_INDATE_RANGE_REQUEST)
      );

      const { data } = await request.get(
        `/api/subscriptions/dailysubs-range?start_date=${
          getState().core.config.startDate
        }&end_date=${
          getState().core.config.endDate
        }&page=${page}&limit=${limit}`,
        config
      );

      dispatch(
        successAction(
          subscriptionActionTypes.DAILYSUBS_INDATE_RANGE_SUCCESS,
          data
        )
      );
    } catch (error) {
      dispatch(
        failedAction(
          subscriptionActionTypes.DAILYSUBS_INDATE_RANGE_FAILED,
          error
        )
      );
    }
  };

export const listAllUnpaidSubscriptions =
  (page, limit) => async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getState().core.login.userInfo.token}`,
        },
      };
      dispatch(
        requestAction(subscriptionActionTypes.UNPAID_SUBSCRIPTIONS_LIST_REQUEST)
      );
      const { data } = await request.get(
        `/api/subscriptions/unpaid?page=${page}&limit=${limit}`,
        config
      );
      dispatch(
        successAction(
          subscriptionActionTypes.UNPAID_SUBSCRIPTIONS_LIST_SUCCESS,
          data
        )
      );
    } catch (error) {
      dispatch(
        failedAction(
          subscriptionActionTypes.UNPAID_SUBSCRIPTIONS_LIST_FAILED,
          error
        )
      );
    }
  };
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
    dailyMember,
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
        dailyMember,
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
  ({ id, paid, isActive }, loaded) =>
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
        },
        config
      );
      dispatch(
        successAction(subscriptionActionTypes.UPDATE_SUBSCRIPTION_SUCCESS, data)
      );
      dispatch(
        listMemberSubscriptions(getState().member.selectMember.member._id)
      );
      loaded && dispatch(selectSubscription(id));
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

export const selectExpincsOfSubscription =
  (id) => async (dispatch, getState) => {
    try {
      dispatch(
        requestAction(subscriptionActionTypes.SELECT_EXPINCS_OF_SUB_REQUEST)
      );
      const config = {
        headers: {
          authorization: `Bearer ${getState().core.login.userInfo.token}`,
        },
      };
      const { data } = await request.get(
        `/api/subscriptions/${id}/expenses`,
        config
      );
      dispatch(
        successAction(
          subscriptionActionTypes.SELECT_EXPINCS_OF_SUB_SUCCESS,
          data
        )
      );
    } catch (error) {
      dispatch(
        failedAction(
          subscriptionActionTypes.SELECT_EXPINCS_OF_SUB_FAILED,
          error
        )
      );
    }
  };
