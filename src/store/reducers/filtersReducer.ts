import { Filters } from "../../types/types";

type FiltersStateType = {
  filteredPeriod: string;
  filters: Filters;
  parametersToFilterArrival: string[][];
};

const initialState: FiltersStateType = {
  filteredPeriod: "10",
  filters: { type: "", routeNumber: "", destination: "" },
  parametersToFilterArrival: [[], [], []],
};

enum FilterArrivalsTypes {
  CHANGE_PERIOD = "CHANGE_PERIOD",
  CHANGE_ARRIVALS_FILTERS = "CHANGE_ARRIVALS_FILTERS",
}

type ChangePeriodActionType = {
  type: FilterArrivalsTypes.CHANGE_PERIOD;
  payload: string;
};

type ChangeArrivalsFiltersActionType = {
  type: FilterArrivalsTypes.CHANGE_ARRIVALS_FILTERS;
  payload: {
    filters: Filters;
    parametrsToFilterArrival: string[][];
  };
};

type FilterArrivalsType = ChangeArrivalsFiltersActionType | ChangePeriodActionType;

export const filtersReducer = (state = initialState, action: FilterArrivalsType): FiltersStateType => {
  switch (action.type) {
    case FilterArrivalsTypes.CHANGE_PERIOD:
      return { ...state, filteredPeriod: action.payload };

    case FilterArrivalsTypes.CHANGE_ARRIVALS_FILTERS:
      return {
        ...state,
        filters: action.payload.filters,
        parametersToFilterArrival: action.payload.parametrsToFilterArrival,
      };

    default:
      return state;
  }
};
