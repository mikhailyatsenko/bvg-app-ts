export type StopType = { id: string; name: string };

export type ArivalsType = {
  [key: string]: string | [] | {} | null;
  line: {
    [key: string]: string | {};
    product: string;
    name: string;
  };
  when: string | null;
  plannedWhen: string;
  provenance: string;
}[];

export type NormalizedArrivalType = {
  type: string;
  time: string;
  routeNumber: string;
  destination: string;
}[];
export type Filters = {
  type: string;
  routeNumber: string;
  destination: string;
};

export enum ArrivalsActionTypes {
  INPUT_SEARCH_TYPING = "INPUT_SEARCH_TYPING",
  SELECT_STOP = "SELECT_STOP",
  FETCHING_ARRIVALS = "FETCHING_ARRIVALS",
  FETCHING_ARRIVALS_SUCCESS = "FETCHING_ARRIVALS_SUCCESS",
  FETCHING_ARRIVALS_ERROR = "FETCHING_ARRIVALS_ERROR",
  BE_IN_CALCULATE = "BE_IN_CALCULATE",
  SET_FAVORITE_STOPS = "SET_FAVORITE_STOPS",
  SET_IS_STOP_IN_FAV = "IS_STOP_IN_FAV",
}

type InputSearchTypingActionType = {
  type: ArrivalsActionTypes.INPUT_SEARCH_TYPING;
  payload: string;
};

type SelectStop = {
  type: ArrivalsActionTypes.SELECT_STOP;
  payload: StopType;
};

type FetchArrivalsActionType = {
  type: ArrivalsActionTypes.FETCHING_ARRIVALS;
};

type FetchingArrivalsSuccessActionType = {
  type: ArrivalsActionTypes.FETCHING_ARRIVALS_SUCCESS;
  payload: NormalizedArrivalType;
};

type FetchArrivalsErrrorActionType = {
  type: ArrivalsActionTypes.FETCHING_ARRIVALS_ERROR;
  payload: string;
};

type BeInCalculateActionType = {
  type: ArrivalsActionTypes.BE_IN_CALCULATE;
  payload: string[];
};

type SetFavoriteStopsActionType = {
  type: ArrivalsActionTypes.SET_FAVORITE_STOPS;
  payload: StopType[];
};

type SetIsStopInFav = {
  type: ArrivalsActionTypes.SET_IS_STOP_IN_FAV;
  payload: boolean;
};

export type ArrivalsActionType =
  | InputSearchTypingActionType
  | SelectStop
  | FetchArrivalsActionType
  | FetchingArrivalsSuccessActionType
  | FetchArrivalsErrrorActionType
  | BeInCalculateActionType
  | SetFavoriteStopsActionType
  | SetIsStopInFav;
