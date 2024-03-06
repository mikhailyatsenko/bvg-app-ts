import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getSearchValue, stopSearchActions } from "..";

export const StopSearch = () => {
  const dispatch = useAppDispatch();

  const searchValue = useSelector(getSearchValue);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(stopSearchActions.setSearchValue(e.target.value));
  };
  return (
    <div className="search-form">
      <input
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
    </div>
  );
};
