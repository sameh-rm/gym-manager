import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import {
  usersListReducer,
  loginReducer,
  addUserReducer,
  updateUserReducer,
  deleteUserReducer,
  selectUserReducer,
  configReducer,
} from "./adminReducers/admin.reducer";
import { sidenavReducer } from "./sidenaveReducer/sideNavReducer";

const corePersistConfig = {
  key: "core",
  storage,
  whitelist: ["login"],
};

const coreReducer = persistReducer(
  corePersistConfig,
  combineReducers({
    sidenav: sidenavReducer,
    usersList: usersListReducer,
    addUser: addUserReducer,
    updateUser: updateUserReducer,
    deleteUser: deleteUserReducer,
    login: loginReducer,
    selectUser: selectUserReducer,
    config: configReducer,
  })
);

export default coreReducer;
