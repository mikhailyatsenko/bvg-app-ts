import { ArrivalsActionTypes } from "../../types/ReduxArrivalsTypes";
import { StopType } from "../../types/MainTypes";

export const selectStopAction = (stop: StopType) => ({
  type: ArrivalsActionTypes.SELECT_STOP,
  payload: stop,
});
