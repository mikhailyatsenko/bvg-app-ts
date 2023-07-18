import React from "react";
import FiltersOnArrivalPage from "./FiltersOnArrivalPage";
import { NormalizedArrivalType, Filters } from "../types";

const ArrivalsPage: React.FC<{
  arrivals: NormalizedArrivalType;
  beIn: string[];
  parametrsToFilterArrival: string[][];
  changeArrivalsFilter: (filterType: string, filterBy: string) => void;
  filters: Filters;
  changePeriod: (period: string) => void;
  filteredPeriod: string;
}> = ({ arrivals, beIn, parametrsToFilterArrival, changeArrivalsFilter, changePeriod, filters, filteredPeriod }) => {
  const arrivalsArray = arrivals[Object.keys(arrivals)[0]];

  return (
    <>
      <div className="arrivals-section">
        <h2 className="">{Object.keys(arrivals)[0]}</h2>

        {arrivals[Object.keys(arrivals)[0]].length ? (
          <div className="arrivals">
            <div className="arrivals__line">
              <div className="arrivals__item">Type of transport</div>
              <div className="arrivals__item">Route number</div>
              <div className="arrivals__item">Destination</div>
              <div className="arrivals__item">Arrival time</div>
              <div className="arrivals__item">Be in</div>
            </div>

            <FiltersOnArrivalPage
              parametrsToFilterArrival={parametrsToFilterArrival}
              changeArrivalsFilter={changeArrivalsFilter}
              changePeriod={changePeriod}
              filters={filters}
              filteredPeriod={filteredPeriod}
            />
            {arrivalsArray.map((arrival, index) => (
              <div className="arrivals__line" key={index}>
                <div className="arrivals__item">{arrival.type}</div>
                <div className="arrivals__item">{arrival.routeNumber}</div>
                <div className="arrivals__item">{arrival.destination}</div>
                <div className="arrivals__item">{arrival.time.slice(11, 16)}</div>
                <div className={`arrivals__item arrivals__item--${beIn[index]}`}>{beIn[index]}</div>
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
