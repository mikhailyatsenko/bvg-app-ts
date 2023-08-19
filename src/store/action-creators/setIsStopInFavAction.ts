import { ArrivalsActionTypes } from "../../types/types";

export const setIsStopInFavAction = (isStopInFav: boolean) => ({
  type: ArrivalsActionTypes.SET_IS_STOP_IN_FAV,
  payload: isStopInFav,
});
