import { combineReducers } from "redux";
import arrivalsReducer from "./arrivalsSlice";
import { filtersReducer } from "./filtersReducer";

export const rootReducer = combineReducers({
  arrivals: arrivalsReducer,
  filters: filtersReducer,
});
