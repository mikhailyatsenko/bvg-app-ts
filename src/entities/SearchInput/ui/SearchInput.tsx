import cls from "./SearchInput.module.scss";

interface SearchInputProps {
  searchValue: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ onChangeInput, searchValue }: SearchInputProps) => {
  return (
    <div className={`${cls.form__group}`}>
      <input
        className={cls.formField}
        autoComplete="off"
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
