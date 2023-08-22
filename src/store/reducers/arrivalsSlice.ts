import { ArrivalsStateType } from "../../types/ReduxArrivalsTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ArrivalsStateType = {
  isLoading: false,
  searchInputValue: "",
  selectedStop: { id: "", name: "" },
  arrivals: [],
  favoriteStops: Array.isArray(JSON.parse(localStorage.getItem("favStops")!))
    ? JSON.parse(localStorage.getItem("favStops")!)
    : [],
  isStopInFav: false,
  beIn: [],
};

export const arrivalsSlice = createSlice({
  name: "arrivals",
  initialState,
  reducers: {},
});

export default arrivalsSlice.reducer;
