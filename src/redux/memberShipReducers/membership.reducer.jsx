import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import { membershipActionTypes } from "./membership.actionTypes";
import storage from "redux-persist/lib/storage";
import { membershipsToOptions } from "./utils";

const initState = {
  membershipsList: [],
};

const membershipsListReducer = (state = initState, action) => {
  switch (action.type) {
    case membershipActionTypes.MEMBERSHIPS_LIST_REQUEST:
      return {
        membershipsList: [],
        loading: true,
      };
    case membershipActionTypes.MEMBERSHIPS_LIST_SUCCESS:
      return {
        membershipsList: action.payload.results,
        membershipsAsOptions: membershipsToOptions(action.payload.results),
        prev: action.payload.prev,
        next: action.payload.next,
        loading: false,
      };
    case membershipActionTypes.MEMBERSHIPS_LIST_FAILED:
      return {
        error: action.payload,
        loading: false,
        membershipsList: [],
      };

    default:
      return state;
  }
};

const addmembershipReducer = (
  state = {
    createdmembership: {
      courses: [],
    },
  },
  action
) => {
  switch (action.type) {
    case membershipActionTypes.INIT_MEMBERSHIP:
      return {
        createdmembership: action.payload,
      };
    case membershipActionTypes.CREATE_MEMBERSHIP_REQUEST:
      return {
        createdmembership: {},
        loading: true,
      };
    case membershipActionTypes.CREATE_MEMBERSHIP_SUCCESS:
      return {
        createdmembership: action.payload,
        loading: false,
        success: true,
      };
    case membershipActionTypes.CREATE_MEMBERSHIP_FAILED:
      return {
        error: action.payload,
        loading: false,
        success: false,

        createdmembership: {},
      };
    case "RESET_ADD_MEMBERSHIP_FORM":
      return {
        success: false,
      };
    default:
      return state;
  }
};

const updatemembershipReducer = (
  state = {
    success: false,
  },
  action
) => {
  switch (action.type) {
    case membershipActionTypes.UPDATE_MEMBERSHIP_REQUEST:
      return {
        updatedmembership: {},
        loading: true,
        success: false,
      };
    case membershipActionTypes.UPDATE_MEMBERSHIP_SUCCESS:
      return {
        updatedmembership: action.payload,
        loading: false,
        success: true,
      };
    case membershipActionTypes.UPDATE_MEMBERSHIP_FAILED:
      return {
        error: action.payload,
        loading: false,
        success: false,

        updatedmembership: {},
      };
    case "RESET_MEMBERSHIP_FORM":
      return {
        success: false,
        updatedmembership: action.payload,
      };

    default:
      return state;
  }
};

const deletemembershipReducer = (state = {}, action) => {
  switch (action.type) {
    case membershipActionTypes.DELETE_MEMBERSHIP_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case membershipActionTypes.DELETE_MEMBERSHIP_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case membershipActionTypes.DELETE_MEMBERSHIP_FAILED:
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

const selectMemberShipReducer = (
  state = {
    membership: null,
  },
  action
) => {
  switch (action.type) {
    case membershipActionTypes.SELECT_MEMBERSHIP_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case membershipActionTypes.SELECT_MEMBERSHIP_SUCCESS:
      return {
        loading: false,
        membership: action.payload,
      };
    case membershipActionTypes.SELECT_MEMBERSHIP_FAILED:
      return {
        success: false,
        loading: false,
        error: action.payload,
      };
    case "RESET_SELECT_MEMBERSHIP":
      return {
        success: false,
        membership: null,
      };
    default:
      return state;
  }
};

const membershipPersistConfig = {
  key: "membership",
  storage,
  whitelist: [""],
};

const membershipReducers = persistReducer(
  membershipPersistConfig,
  combineReducers({
    membershipsList: membershipsListReducer,
    selectMembership: selectMemberShipReducer,
    addMembership: addmembershipReducer,
    updateMembership: updatemembershipReducer,
    deleteMembership: deletemembershipReducer,
  })
);

export default membershipReducers;
