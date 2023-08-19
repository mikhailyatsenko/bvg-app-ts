import { ArrivalsActionTypes } from "../../types/ReduxArrivalsTypes";
import { StopType } from "../../types/MainTypes";

export const setFavoriteStopsAction = (favoriteStops: StopType[]) => ({
  type: ArrivalsActionTypes.SET_FAVORITE_STOPS,
  payload: favoriteStops,
});
