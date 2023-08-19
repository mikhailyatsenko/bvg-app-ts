import { ArrivalsActionTypes } from "../../types/ReduxArrivalsTypes";

export const beInCalculateAction = (beIn: string[]) => ({
  type: ArrivalsActionTypes.BE_IN_CALCULATE,
  payload: beIn,
});
