import React from "react";
import { NormalizedArrivalType } from "../types";

const ArrivalsPage: React.FC<{
  arrivals: NormalizedArrivalType;
  beIn: string[];
}> = ({ arrivals, beIn }) => {
  const arrivalsArray = arrivals[Object.keys(arrivals)[0]];
  // const uniqueParameterArray = ()
  return (
    <>
      <div className="arrivals-section">
        <h2 className="">{Object.keys(arrivals)[0]}</h2>

        {arrivals[Object.keys(arrivals)[0]].length ? (
          <div className="arrivals">
            <div className="arrivals__line">
              <div className="arrivals__item">Type</div>
              {/* <select className="arrivals-filters__transport">
                <option value="all">All types of transport</option>
                {Array.from(new Set(arrivalsArray)).map((arrival, index) => (
                  <option value={arrival.type}>{arrival.type}</option>
                ))}
                <option value="all">All types of transport</option>
                <option value="S-Bahn">S-bahn</option>
                <option value="U-Bahn">U-bahn</option>
                <option value="Bus">Bus</option>
                <option value="Tram">Tram</option>
                <option value="Regional">Regional</option>
              </select> */}
              <div className="arrivals__item">Route number</div>
              <div className="arrivals__item">Destination</div>
              <div className="arrivals__item">Arrival time</div>
              <div className="arrivals__item">Be in</div>
            </div>
            {arrivalsArray.map((arrival, index) => (
              <div className="arrivals__line" key={index}>
                <div className="arrivals__item">{arrival.type}</div>
                <div className="arrivals__item">{arrival.routeNumber}</div>
                <div className="arrivals__item">{arrival.destination}</div>
                <div className="arrivals__item">{arrival.time.slice(11, 16)}</div>
                <div className="arrivals__item">{beIn[index]}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>No arrivals by this request</div>
        )}
      </div>
    </>
  );
};

export default ArrivalsPage;
