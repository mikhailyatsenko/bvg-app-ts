import { useEffect, useRef } from "react";

interface SearchInputProps {
  searchValue: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ onChangeInput, searchValue }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });
  return (
    <input
      ref={inputRef}
      className={
        "search-form__input" +
        // selectedStop &&
        " search-form__input--small"
      }
      type="text"
      value={searchValue}
      placeholder="type stop name here..."
      onChange={(e) => {
        onChangeInput(e);
      }}
    />
  );
};
