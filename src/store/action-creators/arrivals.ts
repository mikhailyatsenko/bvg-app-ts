import { Dispatch } from "react";
import axios from "axios";

import { ArrivalsActionType, ArrivalsActionTypes } from "../../types";

export const fetchUsers = () => {
  return async (dispatch: Dispatch<ArrivalsActionType>) => {
    try {
      dispatch({ type: ArrivalsActionTypes.FETCHING_ARRIVALS });
    } catch (e) {}
  };
};
