import { FiltersStateType } from "../../types/ReduxFiltersTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: FiltersStateType = {
  filteredPeriod: "10",
  filters: { type: "", routeNumber: "", destination: "" },
  parametersToFilterArrival: [[], [], []],
  filteredArrivals: null,
};

export const arrivalsSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
});
