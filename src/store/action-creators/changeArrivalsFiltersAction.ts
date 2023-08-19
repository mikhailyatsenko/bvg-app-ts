import { FilterArrivalsTypes } from "../../types/ReduxFiltersTypes";

export const changeArrivalsFiltersAction = (filters: { filterBy: string; filterType: string }) => ({
  type: FilterArrivalsTypes.CHANGE_ARRIVALS_FILTERS,
  payload: filters,
});
