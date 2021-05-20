import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import { memberActionTypes } from "./member.actionTypes";
import storage from "redux-persist/lib/storage";
import { loadImageUrl } from "../../utils/utils";

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
const initAddMemberState = {
  memberToCreate: {
    name: "",
    phone: "",
    nationalId: "",
    age: 0,
    tall: 0,
    weight: 0,
    image: loadImageUrl("/uploads/person-sample.jpg"),
    personalAddress: {
      address: "",
      city: "المنشية",
      center: "الخانكة",
      governorate: "القليوبية",
    },
  },
};
export const addmemberReducer = (state = initAddMemberState, action) => {
  switch (action.type) {
    case memberActionTypes.INIT_MEMBER:
      return {
        memberToCreate: action.payload,
      };
    case memberActionTypes.CREATE_MEMBER_REQUEST:
      return {
        memberToCreate: state.memberToCreate,
        createdmember: {},
        loading: true,
      };
    case memberActionTypes.CREATE_MEMBER_SUCCESS:
      return {
        memberToCreate: state.memberToCreate,

        createdmember: action.payload,
        loading: false,
        success: true,
      };
    case memberActionTypes.CREATE_MEMBER_FAILED:
      return {
        memberToCreate: state.memberToCreate,

        error: action.payload,
        loading: false,
        success: false,

        createdmember: {},
      };
    case memberActionTypes.RESET_ADD_MEMBER:
      return {};
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
    case memberActionTypes.RESET_EDIT_MEMBER:
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

const selectMemberReducer = (
  state = {
    member: null,
  },
  action
) => {
  switch (action.type) {
    case memberActionTypes.SELECT_MEMBER_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case memberActionTypes.SELECT_MEMBER_SUCCESS:
      return {
        loading: false,
        success: true,
        member: action.payload,
      };
    case memberActionTypes.SELECT_MEMBER_FAILED:
      return {
        success: false,
        loading: false,
        error: action.payload,
      };
    case memberActionTypes.RESET_SELECT_MEMBER:
      return {
        success: false,
      };
    default:
      return state;
  }
};

const memberPersistConfig = {
  key: "member",
  storage,
  whitelist: [""],
};
const memberReducers = persistReducer(
  memberPersistConfig,
  combineReducers({
    membersList: membersListReducer,
    updateMember: updatememberReducer,
    addMember: addmemberReducer,
    deleteMember: deletememberReducer,
    selectMember: selectMemberReducer,
  })
);

export default memberReducers;
