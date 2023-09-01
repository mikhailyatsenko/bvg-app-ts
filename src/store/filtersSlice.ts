import { FiltersStateType } from "../types/ReduxFiltersTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NormalizedArrivalType } from "../types/MainTypes";

const initialState: FiltersStateType = {
  filteredPeriod: "10",
  filters: { type: "", routeNumber: "", destination: "" },
  parametersToFilterArrival: [[], [], []],
  filteredArrivals: null,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changePeriod(state, action: PayloadAction<string>) {
      state.filteredPeriod = action.payload;
    },
    setParametersToFilterArrivals(state, action: PayloadAction<string[][]>) {
      state.parametersToFilterArrival = action.payload;
    },
    changeArrivalsFilters(state, action: PayloadAction<{ filterType: string; filterBy: string }>) {
      state.filters = { ...state.filters, [action.payload.filterType]: action.payload.filterBy };
      console.log(state.filters);
    },
    setFilteredArrivals(state, action: PayloadAction<NormalizedArrivalType | null>) {
      state.filteredArrivals = action.payload;
    },
    resetAllFilters() {
      return initialState;
    },
  },
});

export default filtersSlice.reducer;
