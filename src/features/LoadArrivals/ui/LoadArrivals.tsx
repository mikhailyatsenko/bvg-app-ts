import { useSelector } from "react-redux";
import { getArrivals, getIsLoading, getSelectedStop, arrivalsActions } from "features/LoadArrivals";
// import { getSelectedStop, arrivalsActions } from "features/Stops";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useEffect, useState } from "react";
import { fetchArrivals } from "features/LoadArrivals/model/services/fetchArrivals";
import { useLocation, useSearchParams } from "react-router-dom";
import { getStopNameById } from "features/LoadArrivals/utils/getStopNameById/getStopNameById";
import { getFilteredArrivals } from "features/Filters/model/selectors/getFilteredArrivals";
import { getIsFiltered } from "features/Filters/model/selectors/getIsFiltered";
import { getIntervalArrivals } from "features/Filters/model/selectors/getIntervalArrivals";
import { ArrivalsLine } from "entities/ArrivalsLine";
import { Loader } from "shared/ui/Loader/Loader";
import { calculateMinutesUntilArrival } from "../utils/calculateMinutesUntilArrival/calculateMinutesUntilArrival";
import cls from "./LoadArrivals.module.scss";
import { SetIntervalArrivals } from "features/Filters";

interface LocationState {
  stopName?: string;
}

export const LoadArrivals: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isLoading = useSelector(getIsLoading);
  const arrivals = useSelector(getArrivals);
  const isFiltered = useSelector(getIsFiltered);
  const filteredArrivals = useSelector(getFilteredArrivals);
  const selectedStop = useSelector(getSelectedStop);
  const intervalArrivals = useSelector(getIntervalArrivals);
  const stopId = searchParams.get("id");
  const { stopName }: LocationState = location.state ?? { stopName: undefined };

  const [remainingTimeArray, setRemainingTimeArray] = useState<number[]>([]);

  useEffect(() => {
    if (stopId !== null) {
      if (stopName !== undefined) {
        dispatch(arrivalsActions.setSelectedStopName(stopName));
      } else {
        dispatch(arrivalsActions.setSelectedStopName(getStopNameById(stopId)));
      }
      dispatch(arrivalsActions.setSelectedStopId(stopId));
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

  useEffect(() => {
    const currentArrivals = isFiltered ? filteredArrivals : arrivals;
    setRemainingTimeArray(calculateMinutesUntilArrival(currentArrivals));

    const intervalId = setInterval(() => {
      setRemainingTimeArray(calculateMinutesUntilArrival(currentArrivals));
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [arrivals, filteredArrivals, isFiltered]);

  return (
    <section className={cls.DisplayArrivals}>
      <h3 className={cls.stopName}>{stopName}</h3>
      <SetIntervalArrivals />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={cls.headingLine}>
            <div className={`${cls.headingLineItem}`}>Route</div>
            <div className={`${cls.headingLineItem} ${cls.routeNumberDesktop}`}>Route number</div>
            <div className={cls.headingLineItem}>Destination</div>
            <div className={cls.headingLineItem}>Arrival time</div>
            <div className={cls.headingLineItem}>Be in</div>
          </div>
          {(isFiltered ? filteredArrivals : arrivals).map((arrival, index) => (
            <ArrivalsLine
              key={index}
              destination={arrival.destination}
              remainingTime={remainingTimeArray[index]}
              routeNumber={arrival.routeNumber}
              time={arrival.time}
              transportType={arrival.type}
            />
          ))}
        </>
      )}
    </section>
  );
};
