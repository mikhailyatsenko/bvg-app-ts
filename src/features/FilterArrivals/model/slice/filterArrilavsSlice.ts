import { createSlice } from "@reduxjs/toolkit";
import { type FilterArrivalsSchema, type Filters } from "../types/FilterArrivalsSchema";
import { type PayloadAction } from "@reduxjs/toolkit";
import { type Arrivals } from "features/LoadArrivals";

const initialState: FilterArrivalsSchema = {
  isFiltered: false,
  filters: { destination: "", routeNumber: "", type: "" },
  filteredArrivals: [],
};

export const filterArrilavsSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setIsFiltered: (state, action: PayloadAction<boolean>) => {
      state.isFiltered = action.payload;
    },
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
    },
    setFilteredArrivals: (state, action: PayloadAction<Arrivals>) => {
      state.filteredArrivals = action.payload;
    },
  },
});
export const { actions: filterArrilavsActions, reducer: filterArrilavsReducer } = filterArrilavsSlice;
