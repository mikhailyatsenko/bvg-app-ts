import { ArrivalsStateType } from "../types/ReduxArrivalsTypes";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { StopType } from "../types/MainTypes";
import { fetchArrivalsAction } from "./action-creators/arrivalsActionCreators";
import { normalizeArrivals } from "../utils/normalizeArrivals";

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
  error: "",
};

export const arrivalsSlice = createSlice({
  name: "arrivals",
  initialState,
  reducers: {
    updateInput(state, action: PayloadAction<string>) {
      state.searchInputValue = action.payload;

      if (state.selectedStop.id) {
        state.arrivals = [];
        state.selectedStop = initialState.selectedStop;
        state.searchInputValue = action.payload;
      } else state.searchInputValue = action.payload;
    },

    selectStop(state, action: PayloadAction<StopType>) {
      state.searchInputValue = "";
      state.selectedStop = action.payload;
      state.beIn = [];
    },

    beInCalculate(state, action: PayloadAction<string[]>) {
      state.beIn = action.payload;
    },

    setIsStopInFav(state, action: PayloadAction<boolean>) {
      state.isStopInFav = action.payload;
    },

    setFavoriteStop(state, action: PayloadAction<StopType[]>) {
      state.favoriteStops = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchArrivalsAction.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(fetchArrivalsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.arrivals = normalizeArrivals(action.payload);
    });
    builder.addCase(fetchArrivalsAction.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default arrivalsSlice.reducer;
