import { FilterArrivalsTypes } from "../reducers/filtersReducer";

export const changePeriodAction = (filteredPeriod: string) => ({
  type: FilterArrivalsTypes.CHANGE_PERIOD,
  payload: filteredPeriod,
});
