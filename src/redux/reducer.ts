import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from "./slices/global/GlobalSlice";
import userReducer from "./slices/user/UserSlice";
import dlrReducer from "./slices/dlr/DLRSlice";
import { api } from "./api/api";

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  dlr: dlrReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
