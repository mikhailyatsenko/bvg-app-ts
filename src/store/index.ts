// import { applyMiddleware, createStore } from "redux";
// import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
