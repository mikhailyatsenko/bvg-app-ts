import { createSlice } from "@reduxjs/toolkit";
import { type Arrival, type ArrivalsSchema } from "../types/ArrivalsSchema";
import { type PayloadAction } from "@reduxjs/toolkit";
import { fetchArrivals } from "../services/fetchArrivals";
import { normalizeArrivals } from "../../utils/normalizeArrivals/normalizeArrivals";

const initialState: ArrivalsSchema = {
  isLoading: false,
  arrivals: [],
  error: "",
};

export const arrivalsSlice = createSlice({
  name: "arrivals",
  initialState,
  reducers: {
    setArrivals: (state, action: PayloadAction<Arrival[]>) => {
      state.arrivals = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchArrivals.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchArrivals.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
      state.arrivals = normalizeArrivals(action.payload);
    });
    builder.addCase(fetchArrivals.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export const { actions: arrivalsActions, reducer: arrivalsReducer } = arrivalsSlice;
