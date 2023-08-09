import { Dispatch } from "react";
import axios from "axios";
import { RootStateType } from "../reducers";

import {
  ArrivalsActionType,
  ArrivalsActionTypes,
  ArivalsType,
  NormalizedArrivalType,
} from "../../types/types";

const normalizeArrivals = (arrivalsData: ArivalsType) => {
  // if (selectedStop.id) {
  const normalizedArrivals: NormalizedArrivalType = [];

  let arrivalType: string;
  arrivalsData.forEach((arrival) => {
    switch (arrival.line.product) {
      case "suburban":
        arrivalType = "S-Bahn";
        break;
      case "subway":
        arrivalType = "U-Bahn";
        break;
      case "bus":
        arrivalType = "Bus";
        break;
      case "tram":
        arrivalType = "Tram";
        break;
      case "express":
      case "regional":
        arrivalType = "Regional";
        break;
    }

    normalizedArrivals.push({
      type: arrivalType,
      time: arrival.when || arrival.plannedWhen,
      routeNumber: arrival.line.name,
      destination: arrival.provenance,
    });
  });

  return normalizedArrivals;

  // }
};

export const fetchUsers = () => {
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
