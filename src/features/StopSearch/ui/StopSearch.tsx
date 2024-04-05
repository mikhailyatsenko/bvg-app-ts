import stopsListData from "shared/assets/data/stopsList.json";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getSearchValue, stopSearchActions } from "..";
import { SearchInput } from "entities/SearchInput";
import cls from "./StopSearch.module.scss";
import { ResultTab } from "entities/ResultTab";
import { type Stop, getStopsToRender, stopsActions } from "features/Stops";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DisplayFavoritesStops } from "features/DisplayFavoritesStops";
import { filtersActions } from "features/Filters/model/slice/filterSlice";

export const StopSearch = () => {
  const dispatch = useAppDispatch();
  const searchValue = useSelector(getSearchValue);
  const stopsToRender = useSelector(getStopsToRender);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(stopsActions.resetSelectedStop());
    dispatch(filtersActions.resetFilters());
    dispatch(stopSearchActions.setSearchValue(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      stopsActions.setStopsToRender(
        stopsListData
          .filter((stop) => {
            return stop.name.toLowerCase().includes(searchValue.toLowerCase());
          })
          .slice(0, 10)
      )
    );
  }, [dispatch, searchValue]);

  const selectStopHandler = (selectedStop: Stop): void => {
    navigate(`/arrivals?id=${selectedStop.id}`, { state: { stopName: selectedStop.name } });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(stopSearchActions.setSearchValue(e.target.value));
  };
  return (
    <div className={`${cls.StopSearch} ${searchValue ? cls.toTop : ""}`}>
      <SearchInput onChangeInput={onChangeInput} searchValue={searchValue} />
      <ResultTab onSelect={selectStopHandler} isActive={Boolean(searchValue)} stopsArray={stopsToRender} />
      <DisplayFavoritesStops hide={Boolean(searchValue)} />
    </div>
  );
};
