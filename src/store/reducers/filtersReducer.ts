import {
  FiltersStateType,
  FilterArrivalsTypes,
  FilterArrivalsActionType,
} from "../../types/ReduxFiltersTypes";

const initialState: FiltersStateType = {
  filteredPeriod: "10",
  filters: { type: "", routeNumber: "", destination: "" },
  parametersToFilterArrival: [[], [], []],
  filteredArrivals: null,
};

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
