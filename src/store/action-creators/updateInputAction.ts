import { ArrivalsActionTypes } from "../../types/ReduxArrivalsTypes";

export const updateInputAction = (inputValue: string) => ({
  type: ArrivalsActionTypes.INPUT_SEARCH_TYPING,
  payload: inputValue,
});
