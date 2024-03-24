import { useEffect, useRef } from "react";
import cls from "./SearchInput.module.scss";

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
    <div className={`${cls.form__group}`}>
      <input
        type="input"
        className={cls.formField}
        placeholder="Name"
        name="name"
        id="name"
        autoComplete="off"
        ref={inputRef}
        value={searchValue}
        onChange={(e) => {
          onChangeInput(e);
        }}
      />
      <label htmlFor="name" className={cls.formLabel}>
        Type here to search station
      </label>
    </div>
  );
};
