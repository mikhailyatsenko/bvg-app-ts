import { FilterArrivalsTypes } from "../../types/ReduxFiltersTypes";

export const changePeriodAction = (filteredPeriod: string) => ({
  type: FilterArrivalsTypes.CHANGE_PERIOD,
  payload: filteredPeriod,
});
