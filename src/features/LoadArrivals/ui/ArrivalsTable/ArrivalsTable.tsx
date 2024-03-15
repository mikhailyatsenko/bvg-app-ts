// import FiltersOnArrivalPage from "./FiltersOnArrivalPage";
import { useSelector } from "react-redux";
import { getArrivals } from "features/LoadArrivals";
import { getSelectedStop, stopsActions } from "entities/Stops";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useEffect } from "react";
import { fetchArrivals } from "features/LoadArrivals/model/services/fetchArrivals";
import { useLocation, useSearchParams } from "react-router-dom";
import { getStopNameById } from "features/LoadArrivals/utils/getStopNameById/getStopNameById";
import { getFilteredArrivals } from "features/Filters/model/selectors/getFilteredArrivals";
import { getIsFiltered } from "features/Filters/model/selectors/getIsFiltered";
import { getIntervalArrivals } from "features/Filters/model/selectors/getIntervalArrivals";

interface LocationState {
  stopName?: string;
}

export const ArrivalsTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const arrivals = useSelector(getArrivals);
  const isFiltered = useSelector(getIsFiltered);
  const filteredArrivals = useSelector(getFilteredArrivals);
  const selectedStop = useSelector(getSelectedStop);
  const intervalArrivals = useSelector(getIntervalArrivals);
  const stopId = searchParams.get("id");
  const { stopName }: LocationState = location.state ?? { stopName: undefined };

  useEffect(() => {
    if (stopId !== null) {
      if (stopName !== undefined) {
        dispatch(stopsActions.setSelectedStopName(stopName));
      } else {
        dispatch(stopsActions.setSelectedStopName(getStopNameById(stopId)));
      }
      dispatch(stopsActions.setSelectedStopId(stopId));
    }
  }, [dispatch, stopId, stopName]);

  useEffect(() => {
    const arrivalsData = async () => {
      await dispatch(fetchArrivals({ stopId: selectedStop.id, intervalArrivals }));
    };

    if (selectedStop.id.length) {
      arrivalsData().catch((e) => {
        console.error("Error occurred during fetchArrivals: ", e);
      });
    }
  }, [dispatch, intervalArrivals, selectedStop.id]);

  return (
    <>
      <div className="arrivals-section">
        <h2 className="">{selectedStop.name}</h2>

        <div className="arrivals">
          {(isFiltered ? filteredArrivals : arrivals).map((arrival, index) => (
            <div className="arrivals__line" key={index}>
              <div className="arrivals__item">{arrival.type}</div>
              <div className="arrivals__item">{arrival.routeNumber}</div>
              <div className="arrivals__item">{arrival.destination}</div>
              <div className="arrivals__item">{arrival.time.slice(11, 16)}</div>
              {/* <div className={`arrivals__item arrivals__item--${beIn[index]}`}>{beIn[index]}</div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
