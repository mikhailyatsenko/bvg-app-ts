import { createSlice } from "@reduxjs/toolkit";
import { type StopsSchema, type Stop } from "../types/StopsSchema";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: StopsSchema = {
  stopsToRender: [],
  selectedStop: { id: "", name: "" },
};

export const stopListSlice = createSlice({
  name: "stops",
  initialState,
  reducers: {
    setStopsToRender: (state, action: PayloadAction<Stop[]>) => {
      state.stopsToRender = action.payload;
    },
    setSelectedStop: (state, action: PayloadAction<Stop>) => {
      state.selectedStop = action.payload;
    },
  },
});

export const { actions: stopsActions, reducer: stopsReducer } = stopListSlice;
