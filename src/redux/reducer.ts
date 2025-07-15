import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from "./slices/GlobalSlice";
import userReducer from "./slices/UserSlice";
import { api } from "./api/api";

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;