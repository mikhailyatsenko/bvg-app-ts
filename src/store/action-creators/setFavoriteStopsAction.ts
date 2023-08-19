import { ArrivalsActionTypes, StopType } from "../../types/types";

export const setFavoriteStopsAction = (favoriteStops: StopType[]) => ({
  type: ArrivalsActionTypes.SET_FAVORITE_STOPS,
  payload: favoriteStops,
});
