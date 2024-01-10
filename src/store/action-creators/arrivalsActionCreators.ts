import { RootStateType } from "../";

import axios from "axios";
import { ArrivalsType } from "../../types/MainTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArrivalsAction = createAsyncThunk<
  ArrivalsType,
  undefined,
  { rejectValue: string; state: RootStateType }
>("arrivals/fetchArrivals", async (_, { rejectWithValue, getState }) => {
  try {
    const response = await axios.get<ArrivalsType>(
      `https://v6.bvg.transport.rest/stops/${getState().arrivals.selectedStop.id}/arrivals?duration=${
        getState().filters.filteredPeriod
      }`
    );
    return response.data;
  } catch (e) {
    return rejectWithValue("Server error");
  }
});
