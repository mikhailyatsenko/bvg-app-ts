import { combineReducers } from "redux";
import { arrivalsReducer } from "./arrivalsReducer";

export const rootReducer = combineReducers({
  arrivals: arrivalsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
