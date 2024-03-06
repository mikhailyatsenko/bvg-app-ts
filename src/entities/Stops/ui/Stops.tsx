import stopsListData from "assets/data/stopsList.json";
import { stopsActions } from "..";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getStopsToRender } from "../model/selectors/getStopsToRender/getStopsToRender";
import { getSearchValue } from "features/StopSearch";
import { useEffect } from "react";

export const Stops: React.FC = () => {
  const dispatch = useAppDispatch();

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

  // const stopsToRender = stopsListData
  //   .filter((stop) => {
  //     return stop.name.toLowerCase().includes(
  //       // searchInputValue.toLowerCase()
  //       ""
  //     );
  //   })
  //   .slice(0, 100);

  const selectStopHandler = (selectedStopId: string, selectedStopName: string): void => {
    console.log(selectedStopId, selectedStopName);
  };
  return (
    <>
      {stopsToRender.map((stop) => (
        <div
          className="btn btn--velvet"
          key={stop.id}
          onClick={() => {
            selectStopHandler(stop.id, stop.name);
          }}
        >
          {stop.name}
        </div>
      ))}
    </>
  );
};
