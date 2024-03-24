import { createSlice } from "@reduxjs/toolkit";
import { type FiltersSchema, type ArrivalsFilters } from "../types/FiltersSchema";
import { type PayloadAction } from "@reduxjs/toolkit";
import { type Arrivals } from "features/LoadArrivals";

const initialState: FiltersSchema = {
  isFiltered: false,
  arrivalsFilters: { destination: "", routeNumber: "", type: "" },
  intervalArrivals: "15",
  filteredArrivals: [],
};

export const filterArrilavsSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setIsFiltered: (state, action: PayloadAction<boolean>) => {
      state.isFiltered = action.payload;
    },
    setFilters: (state, action: PayloadAction<ArrivalsFilters>) => {
      state.arrivalsFilters = action.payload;
    },
    setIntervalArrivals: (state, action: PayloadAction<string>) => {
      state.intervalArrivals = action.payload;
    },
    setFilteredArrivals: (state, action: PayloadAction<Arrivals>) => {
      state.filteredArrivals = action.payload;
    },
    resetFilters: (state) => {
      state.arrivalsFilters = initialState.arrivalsFilters;
      state.intervalArrivals = initialState.intervalArrivals;
      state.filteredArrivals = initialState.filteredArrivals;
    },
  },
});
export const { actions: filtersActions, reducer: filtersReducer } = filterArrilavsSlice;
