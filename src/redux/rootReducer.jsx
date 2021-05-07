import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  usersListReducer,
  loginReducer,
  addUserReducer,
} from "./coreReducers/adminReducers/admin.reducer";
import { sidenavReducer } from "./coreReducers/sidenaveReducer/sideNavReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [""],
};
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
    login: loginReducer,
  })
);

const rootReducer = combineReducers({
  core: coreReducer,
});

export default persistReducer(persistConfig, rootReducer);
