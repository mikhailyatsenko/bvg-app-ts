import { NormalizedArrivalType } from "../../types/MainTypes";
import { FilterArrivalsTypes } from "../../types/ReduxFiltersTypes";

export const setFilteredArrivalsAction = (arrivals: NormalizedArrivalType | null) => ({
  type: FilterArrivalsTypes.SET_FILTERED_ARRIVALS,
  payload: arrivals,
});
