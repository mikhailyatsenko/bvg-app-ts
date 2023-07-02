import React, { useEffect, useState } from "react";
import { NormalizedArrivalType } from "../types";

const ArrivalsPage: React.FC<{
  arrivals: NormalizedArrivalType;
}> = ({ arrivals }) => {
  return (
    <>
      <div className="arrivals-section">
        <h2 className="">{Object.keys(arrivals)[0]}</h2>

        {arrivals[Object.keys(arrivals)[0]].length ? (
          <div className="arrivals">
            <div className="arrivals__line">
              <div className="arrivals__item">Arrival time</div>
              <div className="arrivals__item">Type</div>
              <div className="arrivals__item">Route number</div>
              <div className="arrivals__item">Destination</div>
            </div>
            {arrivals[Object.keys(arrivals)[0]].map((arrival, index) => (
              <div className="arrivals__line" key={index}>
                <div className="arrivals__item">{arrival.time.slice(11, 16)}</div>
                <div className="arrivals__item">{arrival.type}</div>
                <div className="arrivals__item">{arrival.routeNumber}</div>
                <div className="arrivals__item">{arrival.destination}</div>
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
