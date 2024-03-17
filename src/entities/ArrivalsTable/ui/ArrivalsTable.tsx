import { type Arrivals } from "features/LoadArrivals";
import { calculateMinutesUntilArrival } from "../utils/calculateMinutesUntilArrival/calculateMinutesUntilArrival";
import { useEffect, useState } from "react";

interface ArrivalsTableProps {
  stopName: string;
  arrivals: Arrivals;
}

export const ArrivalsTable = ({ arrivals, stopName }: ArrivalsTableProps) => {
  const [remainingTimeArray, setRemainingTimeArray] = useState<number[]>([]);

  useEffect(() => {
    setRemainingTimeArray(calculateMinutesUntilArrival(arrivals));

    const intervalId = setInterval(() => {
      setRemainingTimeArray(calculateMinutesUntilArrival(arrivals));
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [arrivals]);

  function formatRemainingTime(minutes: number) {
    if (minutes <= -2) {
      return "gone";
    } else if (minutes <= 0) {
      return "now";
    } else {
      return `~ ${minutes} min`;
    }
  }

  return (
    <>
      <div className="arrivals-section">
        <h2 className="">{stopName}</h2>

        <div className="arrivals">
          {arrivals.map((arrival, index) => (
            <div className="arrivals__line" key={index}>
              <div className="arrivals__item">{arrival.type}</div>
              <div className="arrivals__item">{arrival.routeNumber}</div>
              <div className="arrivals__item">{arrival.destination}</div>
              <div className="arrivals__item">{arrival.time.slice(11, 16)}</div>
              <div className="arrivals__item">{formatRemainingTime(remainingTimeArray[index])}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
