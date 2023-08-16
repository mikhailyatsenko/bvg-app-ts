import { ArrivalsActionTypes } from "../../types/types";

export const updateInputAction = (inputValue: string) => ({
  type: ArrivalsActionTypes.INPUT_SEARCH_TYPING,
  payload: inputValue,
});
