import stopsListData from "assets/data/stopsList.json";
import { stopsActions, type Stop } from "..";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getStopsToRender } from "..";
import { getSearchValue } from "features/StopSearch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Stops: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stopsToRender = useSelector(getStopsToRender);
  const searchValue = useSelector(getSearchValue);
  console.log(stopsToRender);

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
    dispatch(stopsActions.setSelectedStop(selectedStop));
    navigate("/arrivals");
  };
  return (
    <>
      {stopsToRender.map((stop) => (
        <div
          className="btn btn--velvet"
          key={stop.id}
          onClick={() => {
            selectStopHandler({ id: stop.id, name: stop.name });
          }}
        >
          {stop.name}
        </div>
      ))}
    </>
  );
};
