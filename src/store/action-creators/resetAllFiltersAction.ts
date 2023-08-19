import { FilterArrivalsTypes } from "../../types/ReduxFiltersTypes";

export const resetAllFiltersAction = () => ({
  type: FilterArrivalsTypes.RESET_ALL_FILTERS,
});
