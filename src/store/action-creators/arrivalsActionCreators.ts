import { ArrivalsActionTypes, ArrivalsActionType } from "../../types/ReduxArrivalsTypes";
import { StopType } from "../../types/MainTypes";
import { RootStateType } from "../reducers";

import { Dispatch } from "redux";
import axios from "axios";

import { normalizeArrivals } from "../../utils/normalizeArrivals";

export const fetchArrivalsAction = () => {
  return async (dispatch: Dispatch<ArrivalsActionType>, getState: () => RootStateType) => {
    try {
      dispatch({ type: ArrivalsActionTypes.FETCHING_ARRIVALS });
      const response = await axios.get(
        `https://v6.bvg.transport.rest/stops/${getState().arrivals.selectedStop.id}/arrivals?duration=${
          getState().filters.filteredPeriod
        }`
      );
      dispatch({
        type: ArrivalsActionTypes.FETCHING_ARRIVALS_SUCCESS,
        payload: normalizeArrivals(response.data.arrivals),
      });
    } catch (e) {
      dispatch({ type: ArrivalsActionTypes.FETCHING_ARRIVALS_ERROR, payload: "Fetching error" });
    }
  };
};

export const beInCalculateAction = (beIn: string[]) => ({
  type: ArrivalsActionTypes.BE_IN_CALCULATE,
  payload: beIn,
});

export const selectStopAction = (stop: StopType) => ({
  type: ArrivalsActionTypes.SELECT_STOP,
  payload: stop,
});

export const setFavoriteStopsAction = (favoriteStops: StopType[]) => ({
  type: ArrivalsActionTypes.SET_FAVORITE_STOPS,
  payload: favoriteStops,
});

export const updateInputAction = (inputValue: string) => ({
  type: ArrivalsActionTypes.INPUT_SEARCH_TYPING,
  payload: inputValue,
});

export const setIsStopInFavAction = (isStopInFav: boolean) => ({
  type: ArrivalsActionTypes.SET_IS_STOP_IN_FAV,
  payload: isStopInFav,
});
