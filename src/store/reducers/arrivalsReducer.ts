import { StopType, NormalizedArrivalType, ArrivalsActionType, ArrivalsActionTypes } from "../../types";

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
    case ArrivalsActionTypes.FETCHING_ARRIVALS:
      return { ...state, isLoading: true };
    case ArrivalsActionTypes.INPUT_SEARCH_TYPING:
      return {
        ...state,
        searchInputValue: action.payload,
      };
    case ArrivalsActionTypes.FETCHING_ARRIVALS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        searchInputValue: "",
        selectedStop: action.payload.selectedStop,
        arrivals: action.payload.arrivals,
        isStopInFav: action.payload.isStopInFav,
        beIn: action.payload.beIn,
      };
    default:
      return state;
  }
};
