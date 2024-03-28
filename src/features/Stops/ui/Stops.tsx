import stopsListData from "shared/assets/data/stopsList.json";
import { stopsActions, type Stop } from "..";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getStopsToRender } from "..";
import { getSearchValue, stopSearchActions } from "features/StopSearch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonWithStop } from "entities/ButtonWithStop";
import cls from "./Stops.module.scss";
import { filtersActions } from "features/Filters/model/slice/filterSlice";
import { getFavoritesStops } from "features/AddToFavorites/model/selectors/getFavoritesStops/getFavoritesStops";

export const Stops: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stopsToRender = useSelector(getStopsToRender);
  const searchValue = useSelector(getSearchValue);
  const favoritesStops = useSelector(getFavoritesStops);

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

  return (
    <div className={cls.Stops}>
      {favoritesStops.length
        ? favoritesStops.map((stop) => (
            <ButtonWithStop isFav={true} key={stop.id} selectStopHandler={selectStopHandler} stop={stop} />
          ))
        : ""}
      {stopsToRender.map((stop) => (
        <ButtonWithStop key={stop.id} selectStopHandler={selectStopHandler} stop={stop} />
      ))}
    </div>
  );
};
