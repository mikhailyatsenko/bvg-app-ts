import stopsListData from "shared/assets/data/stopsList.json";
import { stopsActions, type Stop } from "..";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getStopsToRender } from "..";
import { getSearchValue } from "features/StopSearch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardWithStopName } from "entities/CardWithStopName";
import cls from "./Stops.module.scss";

export const Stops: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stopsToRender = useSelector(getStopsToRender);
  const searchValue = useSelector(getSearchValue);

  useEffect(() => {
    dispatch(
      stopsActions.setStopsToRender(
        stopsListData
          .filter((stop) => {
            return stop.name.toLowerCase().includes(searchValue.toLowerCase());
          })
          .slice(0, 100)
      )
    );
  }, [dispatch, searchValue]);

  const selectStopHandler = (selectedStop: Stop): void => {
    navigate(`/arrivals?id=${selectedStop.id}`, { state: { stopName: selectedStop.name } });
  };

  return (
    <div className={cls.Stops}>
      {stopsToRender.map((stop) => (
        <CardWithStopName key={stop.id} selectStopHandler={selectStopHandler} stop={stop} />
      ))}
    </div>
  );
};
