import { ArrivalsActionTypes } from "../../types/types";

export const beInCalculateAction = (beIn: string[]) => ({
  type: ArrivalsActionTypes.BE_IN_CALCULATE,
  payload: beIn,
});
