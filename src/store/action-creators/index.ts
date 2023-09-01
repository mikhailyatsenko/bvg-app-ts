// // import * as arrivalsActionCreators from "./arrivalsActionCreators";
// import * as filterArrivalsActionCreators from "./filterArrivalsActionCreators";
import { filtersSlice } from "../filtersSlice";
import { arrivalsSlice } from "../arrivalsSlice";
import { fetchArrivalsAction } from "./arrivalsActionCreators";

export default {
  ...filtersSlice.actions,
  ...arrivalsSlice.actions,
  fetchArrivalsAction,
};
