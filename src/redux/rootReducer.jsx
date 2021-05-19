import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import coreReducer from "./coreReducers/coreReducer";
import courseReducers from "./courseReducers/course.reducer";
import memberReducers from "./memberReducers/member.reducer";
import membershipReducers from "./memberShipReducers/membership.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [""],
};

const rootReducer = combineReducers({
  core: coreReducer,
  course: courseReducers,
  member: memberReducers,
  membership: membershipReducers,
});

export default persistReducer(persistConfig, rootReducer);
