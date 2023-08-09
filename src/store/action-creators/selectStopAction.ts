import { ArrivalsActionTypes, StopType } from "../../types/types";

export const selectStopAction = (stop: StopType) => ({
  type: ArrivalsActionTypes.SELECT_STOP,
  payload: stop,
});
