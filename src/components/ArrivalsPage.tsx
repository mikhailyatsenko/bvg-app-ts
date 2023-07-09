import React, { useEffect, useState } from "react";
import { NormalizedArrivalType } from "../types";

const ArrivalsPage: React.FC<{
  arrivals: NormalizedArrivalType;
  minutesToArrival: (arrivalTime: string) => string;
}> = ({ arrivals, minutesToArrival }) => {
  const [beIn, setBeIn] = useState<string[]>([]);
  let beInTemp: string[] = [];

  useEffect(() => {
    arrivals[Object.keys(arrivals)[0]].forEach((arrival) => {
      beInTemp.push(minutesToArrival(arrival.time));
    });
    setBeIn(beInTemp);

    const interval: NodeJS.Timer = setInterval(() => {
      beInTemp = [];
      arrivals[Object.keys(arrivals)[0]].forEach((arrival) => {
        beInTemp.push(minutesToArrival(arrival.time));
      });
      setBeIn(beInTemp);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="arrivals-section">
        <h2 className="">{Object.keys(arrivals)[0]}</h2>

        {arrivals[Object.keys(arrivals)[0]].length ? (
          <div className="arrivals">
            <div className="arrivals__line">
              <div className="arrivals__item">Type</div>
              <div className="arrivals__item">Route number</div>
              <div className="arrivals__item">Destination</div>
              <div className="arrivals__item">Arrival time</div>
              <div className="arrivals__item">Be in</div>
            </div>
            {arrivals[Object.keys(arrivals)[0]].map((arrival, index) => (
              <div className="arrivals__line" key={index}>
                <div className="arrivals__item">{arrival.type}</div>
                <div className="arrivals__item">{arrival.routeNumber}</div>
                <div className="arrivals__item">{arrival.destination}</div>
                <div className="arrivals__item">{arrival.time.slice(11, 16)}</div>
                {/* <div className="arrivals__item">{arrival.time}</div> */}
                <div className="arrivals__item">~ {beIn[index]}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>No arrivals</div>
        )}
      </div>
    </>
  );
};

export default ArrivalsPage;
