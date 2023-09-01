import { RootStateType } from "../";

import axios from "axios";
import { ArrivalsType, NormalizedArrivalType } from "../../types/MainTypes";
// import { normalizeArrivals } from "../../utils/normalizeArrivals";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchArrivalsAction = () => {
//   return async (dispatch: AppDispatch, getState: () => RootStateType) => {
//     try {
//       dispatch(arrivalsSlice.actions.fetchingArrivals());
//       const response = await axios.get(
//         `https://v6.bvg.transport.rest/stops/${getState().arrivals.selectedStop.id}/arrivals?duration=${
//           getState().filters.filteredPeriod
//         }`
//       );
//       dispatch(
//         dispatch(arrivalsSlice.actions.fetchingArrivalsSuccess(normalizeArrivals(response.data.arrivals)))
//       );
//     } catch (e: any) {
//       dispatch(arrivalsSlice.actions.fetchingArrivalsError(e.message));
//     }
//   };
// };

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
    console.log(response.data);
    return response.data;
  } catch (e) {
    return rejectWithValue("Server error");
  }
});
