import { combineReducers } from "redux";
import { arrivalsReducer } from "./arrivalsReducer";
import { filtersReducer } from "./filtersReducer";

export const rootReducer = combineReducers({
  arrivals: arrivalsReducer,
  filters: filtersReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
