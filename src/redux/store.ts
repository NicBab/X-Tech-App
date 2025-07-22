import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slices/global/GlobalSlice";
import userReducer from "./slices/user/UserSlice";
import timeReducer from "./slices/time/TimeSlice";
import dlrReducer from "./slices/dlr/DLRSlice";
import { api } from "./api/api"; // RTK Query api
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["global", "user"], 
};

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  time: timeReducer,
  dlr: dlrReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
