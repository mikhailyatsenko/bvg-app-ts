import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getSearchValue, stopSearchActions } from "..";
import { SearchInput } from "entities/SearchInput";

export const StopSearch = () => {
  const dispatch = useAppDispatch();

  const searchValue = useSelector(getSearchValue);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(stopSearchActions.setSearchValue(e.target.value));
  };
  return (
    <div className="search-form">
      <SearchInput onChangeInput={onChangeInput} searchValue={searchValue} />
    </div>
  );
};
