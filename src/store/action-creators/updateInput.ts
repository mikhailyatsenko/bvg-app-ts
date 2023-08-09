import { ArrivalsActionTypes } from "../../types/types";

export const updateInput = (inputValue: string) => ({
  type: ArrivalsActionTypes.INPUT_SEARCH_TYPING,
  payload: inputValue,
});
