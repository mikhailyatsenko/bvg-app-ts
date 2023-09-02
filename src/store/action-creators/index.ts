import { filtersSlice } from "../filtersSlice";
import { arrivalsSlice } from "../arrivalsSlice";
import { fetchArrivalsAction } from "./arrivalsActionCreators";

const actions = {
  ...filtersSlice.actions,
  ...arrivalsSlice.actions,
  fetchArrivalsAction,
};

export default actions;
