import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import { subscriptionActionTypes } from "./subscriptions.actionTypes";
import storage from "redux-persist/lib/storage";

const initState = {
  subscriptionList: [],
};

const subscriptionListReducer = (state = initState, action) => {
  switch (action.type) {
    case subscriptionActionTypes.SUBSCRIPTIONS_LIST_REQUEST:
      return {
        subscriptionList: [],
        loading: true,
      };
    case subscriptionActionTypes.SUBSCRIPTIONS_LIST_SUCCESS:
      return {
        subscriptionList: action.payload.results,
        prev: action.payload.prev,
        next: action.payload.next,
        loading: false,
      };
    case subscriptionActionTypes.SUBSCRIPTIONS_LIST_FAILED:
      return {
        error: action.payload,
        loading: false,
        subscriptionList: [],
      };

    default:
      return state;
  }
};

const addsubscriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case subscriptionActionTypes.CREATE_SUBSCRIPTION_REQUEST:
      return {
        createdsubscription: {},
        loading: true,
      };
    case subscriptionActionTypes.CREATE_SUBSCRIPTION_SUCCESS:
      return {
        createdsubscription: action.payload,
        loading: false,
        success: true,
      };
    case subscriptionActionTypes.CREATE_SUBSCRIPTION_FAILED:
      return {
        error: action.payload,
        loading: false,
        success: false,

        createdsubscription: {},
      };
    case "RESET_ADD_SUBSCRIPTION_FORM":
      return {
        success: false,
      };
    default:
      return state;
  }
};

const updatesubscriptionReducer = (
  state = {
    success: false,
  },
  action
) => {
  switch (action.type) {
    case subscriptionActionTypes.UPDATE_SUBSCRIPTION_REQUEST:
      return {
        updatedsubscription: {},
        loading: true,
        success: false,
      };
    case subscriptionActionTypes.UPDATE_SUBSCRIPTION_SUCCESS:
      return {
        updatedsubscription: action.payload,
        loading: false,
        success: true,
      };
    case subscriptionActionTypes.UPDATE_SUBSCRIPTION_FAILED:
      return {
        error: action.payload,
        loading: false,
        success: false,

        updatedsubscription: {},
      };
    case "RESET_SUBSCRIPTION_FORM":
      return {
        success: false,
        updatedsubscription: action.payload,
      };

    default:
      return state;
  }
};

const deletesubscriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case subscriptionActionTypes.DELETE_SUBSCRIPTION_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case subscriptionActionTypes.DELETE_SUBSCRIPTION_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case subscriptionActionTypes.DELETE_SUBSCRIPTION_FAILED:
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

const selectSubscriptionReducer = (
  state = {
    subscription: null,
  },
  action
) => {
  switch (action.type) {
    case subscriptionActionTypes.SELECT_SUBSCRIPTION_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case subscriptionActionTypes.SELECT_SUBSCRIPTION_SUCCESS:
      return {
        loading: false,
        subscription: action.payload,
      };
    case subscriptionActionTypes.SELECT_SUBSCRIPTION_FAILED:
      return {
        success: false,
        loading: false,
        error: action.payload,
      };
    case subscriptionActionTypes.RESET_SELECT_SUBSCRIPTION:
      return {
        success: false,
      };
    default:
      return state;
  }
};

const subscriptionPersistConfig = {
  key: "subscription",
  storage,
  whitelist: [""],
};

const subscriptionReducers = persistReducer(
  subscriptionPersistConfig,
  combineReducers({
    subscriptionList: subscriptionListReducer,
    selectSubscription: selectSubscriptionReducer,
    addSubscription: addsubscriptionReducer,
    updateSubscription: updatesubscriptionReducer,
    deleteSubscription: deletesubscriptionReducer,
  })
);

export default subscriptionReducers;
