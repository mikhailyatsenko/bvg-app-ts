import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { type TransportTypeKey } from "../../utils/normalizeArrivals/normalizeArrivals";
// import { userActions, type User } from "entities/User";
// import { USER_LOCAL_STORAGE_KEY } from "shared/const/localStorage";

export interface ArivalsRawData {
  arrivals: Array<{
    stop: {
      name: string;
    };
    line: {
      product: TransportTypeKey;
      name: string;
    };
    when: string | null;
    plannedWhen: string;
    provenance: string;
  }>;
}

export const fetchArrivals = createAsyncThunk<ArivalsRawData, string, { rejectValue: string }>(
  "arrivals/fetchByStopId",
  async (stopId: string, thunkAPI) => {
    try {
      const response = await axios.get<ArivalsRawData>(
        `https://v6.bvg.transport.rest/stops/${stopId}/arrivals?duration=10`
      );

      //   localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(response.data)); possible to make "recently searched in ls"
      //   thunkAPI.dispatch(userActions.setAuthData(response.data));
      return response.data;
    } catch (e) {
      console.log("Error in fetch: ", e);
      return thunkAPI.rejectWithValue("Error in fetch");
    }
  }
);
