import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getSearchValue, stopSearchActions } from "..";
import { SearchInput } from "entities/SearchInput";
import cls from "./StopSearch.module.scss";

export const StopSearch = () => {
  const dispatch = useAppDispatch();

  const searchValue = useSelector(getSearchValue);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(stopSearchActions.setSearchValue(e.target.value));
  };
  return (
    <div className={cls.StopSearch}>
      <SearchInput onChangeInput={onChangeInput} searchValue={searchValue} />
    </div>
  );
};
