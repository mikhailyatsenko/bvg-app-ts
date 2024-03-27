import { useEffect, useRef } from "react";
import cls from "./SearchInput.module.scss";

interface SearchInputProps {
  searchValue: string;
  isStopsInView: boolean;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ onChangeInput, searchValue, isStopsInView }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isStopsInView) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 200);
    }
  }, [isStopsInView]);

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
