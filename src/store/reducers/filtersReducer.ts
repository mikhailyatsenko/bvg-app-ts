import { Filters, NormalizedArrivalType } from "../../types/types";

type FiltersStateType = {
  filteredPeriod: string;
  filters: Filters;
  parametersToFilterArrival: string[][];
  filteredArrivals: NormalizedArrivalType | null;
};

const initialState: FiltersStateType = {
  filteredPeriod: "10",
  filters: { type: "", routeNumber: "", destination: "" },
  parametersToFilterArrival: [[], [], []],
  filteredArrivals: null,
};

export enum FilterArrivalsTypes {
  CHANGE_PERIOD = "CHANGE_PERIOD",
  SET_PARAMETERS_TO_FILTER_ARRIVALS = "SET_PARAMETERS_TO_FILTER_ARRIVALS",
  CHANGE_ARRIVALS_FILTERS = "CHANGE_ARRIVALS_FILTERS",
  SET_FILTERED_ARRIVALS = "SET_FILTERED_ARRIVALS",
  RESET_ALL_FILTERS = "RESET_ALL_FILTERS",
}

type ChangePeriodActionType = {
  type: FilterArrivalsTypes.CHANGE_PERIOD;
  payload: string;
};

type SetParametersToFilterArrivalsActionType = {
  type: FilterArrivalsTypes.SET_PARAMETERS_TO_FILTER_ARRIVALS;
  payload: string[][];
};

type ChangeArrivalsFiltersActionType = {
  type: FilterArrivalsTypes.CHANGE_ARRIVALS_FILTERS;
  payload: { filterBy: string; filterType: string };
};

type SetFilteredArrivalsActionType = {
  type: FilterArrivalsTypes.SET_FILTERED_ARRIVALS;
  payload: NormalizedArrivalType;
};

type ResetAllFiltersActionType = {
  type: FilterArrivalsTypes.RESET_ALL_FILTERS;
};

export type FilterArrivalsActionType =
  | ChangeArrivalsFiltersActionType
  | ChangePeriodActionType
  | SetParametersToFilterArrivalsActionType
  | SetFilteredArrivalsActionType
  | ResetAllFiltersActionType;

export const filtersReducer = (state = initialState, action: FilterArrivalsActionType): FiltersStateType => {
  switch (action.type) {
    case FilterArrivalsTypes.CHANGE_PERIOD:
      return { ...state, filteredPeriod: action.payload };

    case FilterArrivalsTypes.SET_PARAMETERS_TO_FILTER_ARRIVALS:
      return {
        ...state,
        parametersToFilterArrival: action.payload,
      };
    case FilterArrivalsTypes.CHANGE_ARRIVALS_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, [action.payload.filterType]: action.payload.filterBy },
      };

    case FilterArrivalsTypes.SET_FILTERED_ARRIVALS:
      return {
        ...state,
        filteredArrivals: action.payload,
      };

    case FilterArrivalsTypes.RESET_ALL_FILTERS:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};
