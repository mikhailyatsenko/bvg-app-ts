import React, { useEffect, useRef } from "react";
import { StopType } from "../types/MainTypes";

const SearchStop: React.FC<{
  updateSearchInput: (value: string) => void;
  searchInputValue: string;
  selectedStop: StopType;
}> = ({ updateSearchInput, searchInputValue, selectedStop }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current && !selectedStop.id) inputRef.current.focus();
  });

  return (
    <div className="search-form">
      <input
        className={"search-form__input" + (selectedStop && " search-form__input--small")}
        type="text"
        value={searchInputValue}
        placeholder="type stop name here..."
        ref={inputRef}
        onChange={(event) => {
          updateSearchInput(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchStop;
