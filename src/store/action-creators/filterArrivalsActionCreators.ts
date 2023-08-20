import { NormalizedArrivalType } from "../../types/MainTypes";
import { FilterArrivalsTypes } from "../../types/ReduxFiltersTypes";

export const changeArrivalsFiltersAction = (filters: { filterBy: string; filterType: string }) => ({
  type: FilterArrivalsTypes.CHANGE_ARRIVALS_FILTERS,
  payload: filters,
});

export const changePeriodAction = (filteredPeriod: string) => ({
  type: FilterArrivalsTypes.CHANGE_PERIOD,
  payload: filteredPeriod,
});

export const resetAllFiltersAction = () => ({
  type: FilterArrivalsTypes.RESET_ALL_FILTERS,
});

export const setFilteredArrivalsAction = (arrivals: NormalizedArrivalType | null) => ({
  type: FilterArrivalsTypes.SET_FILTERED_ARRIVALS,
  payload: arrivals,
});

export const setParametersToFilterArrivalsAction = (parameters: string[][]) => ({
  type: FilterArrivalsTypes.SET_PARAMETERS_TO_FILTER_ARRIVALS,
  payload: parameters,
});
