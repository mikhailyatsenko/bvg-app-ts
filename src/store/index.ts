import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "redux";
import arrivalsReducer from "./arrivalsSlice";
import filtersReducer from "./filtersSlice";

export const rootReducer = combineReducers({
  arrivals: arrivalsReducer,
  filters: filtersReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
