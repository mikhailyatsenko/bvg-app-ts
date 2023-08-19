import { NormalizedArrivalType } from "../../types/types";
import { FilterArrivalsTypes } from "../reducers/filtersReducer";

export const setFilteredArrivalsAction = (arrivals: NormalizedArrivalType | null) => ({
  type: FilterArrivalsTypes.SET_FILTERED_ARRIVALS,
  payload: arrivals,
});
