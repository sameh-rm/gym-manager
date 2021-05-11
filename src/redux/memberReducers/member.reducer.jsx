import { memberActionTypes } from "./member.actionTypes";

const initState = {
  membersList: [],
};

export const membersListReducer = (state = initState, action) => {
  switch (action.type) {
    case memberActionTypes.MEMBERS_LIST_REQUEST:
      return {
        membersList: [],
        loading: true,
      };
    case memberActionTypes.MEMBERS_LIST_SUCCESS:
      return {
        membersList: action.payload.results,
        prev: action.payload.prev,
        next: action.payload.next,
        loading: false,
      };
    case memberActionTypes.MEMBERS_LIST_FAILED:
      return {
        error: action.payload,
        loading: false,
        membersList: [],
      };

    default:
      return state;
  }
};

export const addmemberReducer = (state = {}, action) => {
  switch (action.type) {
    case memberActionTypes.CREATE_MEMBER_REQUEST:
      return {
        createdmember: {},
        loading: true,
      };
    case memberActionTypes.CREATE_MEMBER_SUCCESS:
      return {
        createdmember: action.payload,
        loading: false,
        success: true,
      };
    case memberActionTypes.CREATE_MEMBER_FAILED:
      return {
        error: action.payload,
        loading: false,
        success: false,

        createdmember: {},
      };
    case "RESET_ADD_MEMBER_FORM":
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const updatememberReducer = (
  state = {
    success: false,
  },
  action
) => {
  switch (action.type) {
    case memberActionTypes.UPDATE_MEMBER_REQUEST:
      return {
        updatedmember: {},
        loading: true,
        success: false,
      };
    case memberActionTypes.UPDATE_MEMBER_SUCCESS:
      return {
        updatedmember: action.payload,
        loading: false,
        success: true,
      };
    case memberActionTypes.UPDATE_MEMBER_FAILED:
      return {
        error: action.payload,
        loading: false,
        success: false,

        updatedmember: {},
      };
    case "RESET_MEMBER_FORM":
      return {
        success: false,
        updatedmember: action.payload,
      };

    default:
      return state;
  }
};

export const deletememberReducer = (state = {}, action) => {
  switch (action.type) {
    case memberActionTypes.DELETE_MEMBER_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case memberActionTypes.DELETE_MEMBER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case memberActionTypes.DELETE_MEMBER_FAILED:
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
      return {};
  }
};
