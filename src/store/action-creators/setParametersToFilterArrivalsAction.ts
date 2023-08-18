import { FilterArrivalsTypes } from "../reducers/filtersReducer";

export const setParametersToFilterArrivalsAction = (parameters: string[][]) => ({
  type: FilterArrivalsTypes.SET_PARAMETERS_TO_FILTER_ARRIVALS,
  payload: parameters,
});
