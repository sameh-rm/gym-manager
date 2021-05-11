import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  usersListReducer,
  loginReducer,
  addUserReducer,
  updateUserReducer,
  deleteUserReducer,
} from "./coreReducers/adminReducers/admin.reducer";
import { sidenavReducer } from "./coreReducers/sidenaveReducer/sideNavReducer";
import { coursesListReducer } from "./courseReducers/course.reducer";
import { membersListReducer } from "./memberReducers/member.reducer";

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
    updateUser: updateUserReducer,
    deleteUser: deleteUserReducer,
    login: loginReducer,
  })
);

const coursePersistConfig = {
  key: "course",
  storage,
  whitelist: [""],
};
const courseReducers = persistReducer(
  coursePersistConfig,
  combineReducers({
    coursesList: coursesListReducer,
  })
);

const memberPersistConfig = {
  key: "member",
  storage,
  whitelist: [""],
};
const memberReducers = persistReducer(
  memberPersistConfig,
  combineReducers({
    membersList: membersListReducer,
  })
);

const rootReducer = combineReducers({
  core: coreReducer,
  course: courseReducers,
  member: memberReducers,
});

export default persistReducer(persistConfig, rootReducer);
