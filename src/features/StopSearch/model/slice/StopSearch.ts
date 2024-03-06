import { createSlice } from "@reduxjs/toolkit";
import { type StopSearchSchema } from "../types/StopSearchSchema";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: StopSearchSchema = {
  searchValue: "",
};

export const stopSearchSlice = createSlice({
  name: "stopsSearch",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { actions: stopSearchActions, reducer: stopSearchReducer } = stopSearchSlice;
