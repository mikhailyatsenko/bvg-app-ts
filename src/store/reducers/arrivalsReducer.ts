import { act } from "@testing-library/react";
import { StopType, NormalizedArrivalType, ArrivalsActionType, ArrivalsActionTypes } from "../../types/types";

type StopsStateType = {
  isLoading: boolean;
  searchInputValue: string;
  selectedStop: StopType;
  arrivals: NormalizedArrivalType;
  filteredArrivals: NormalizedArrivalType | null;
  favoriteStops: StopType[];
  isStopInFav: boolean;
  beIn: string[];
};

const initialState: StopsStateType = {
  isLoading: false,
  searchInputValue: "",
  selectedStop: { id: "", name: "" },
  arrivals: [],
  filteredArrivals: [],
  favoriteStops: Array.isArray(JSON.parse(localStorage.getItem("favStops")!))
    ? JSON.parse(localStorage.getItem("favStops")!)
    : [],
  isStopInFav: false,
  beIn: [],
};

export const arrivalsReducer = (state = initialState, action: ArrivalsActionType): StopsStateType => {
  switch (action.type) {
    case ArrivalsActionTypes.INPUT_SEARCH_TYPING:
      return {
        ...state,
        searchInputValue: action.payload,
        // selectedStop: () => {
        //   if (state.selectedStop.id) return { id: "", name: "" };
        // },
      };

    case ArrivalsActionTypes.SELECT_STOP:
      return {
        ...state,
        searchInputValue: "",
        selectedStop: action.payload,
      };
    case ArrivalsActionTypes.FETCHING_ARRIVALS:
      return { ...state, isLoading: true };
    case ArrivalsActionTypes.FETCHING_ARRIVALS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        arrivals: action.payload,
      };
    default:
      return state;
  }
};
