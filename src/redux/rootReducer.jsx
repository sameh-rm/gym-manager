import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { sidenavReducer } from "./coreReducers/sidenaveReducer/sideNavReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["sideNav"],
};

const rootReducer = combineReducers({
  sidenav: sidenavReducer,
});

export default persistReducer(persistConfig, rootReducer);
