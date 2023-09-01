import React from "react";
import FiltersOnArrivalPage from "./FiltersOnArrivalPage";
import { useTypedSelector } from "../hooks/useTypedSelector";

const ArrivalsPage: React.FC<{
  changeArrivalsFilter: (filterType: string, filterBy: string) => void;
  changePeriodHandler: (period: string) => void;
  resetAllArrivalsFilters: () => void;
}> = ({ changeArrivalsFilter, changePeriodHandler, resetAllArrivalsFilters }) => {
  const { arrivals, isLoading, selectedStop, beIn, error } = useTypedSelector((state) => state.arrivals);
  const { filteredArrivals } = useTypedSelector((state) => state.filters);
  const arrivalsToDisplay = filteredArrivals || arrivals;
  return (
    <>
      <div className="arrivals-section">
        <h2 className="">{selectedStop.name}</h2>

        <div className="arrivals">
          <FiltersOnArrivalPage
            changeArrivalsFilter={changeArrivalsFilter}
            changePeriodHandler={changePeriodHandler}
            resetAllArrivalsFilters={resetAllArrivalsFilters}
          />

          {isLoading ? (
            <div className="lds-dual-ring"></div>
          ) : arrivalsToDisplay.length ? (
            arrivalsToDisplay.map((arrival, index) => (
              <div className="arrivals__line" key={index}>
                <div className="arrivals__item">{arrival.type}</div>
                <div className="arrivals__item">{arrival.routeNumber}</div>
                <div className="arrivals__item">{arrival.destination}</div>
                <div className="arrivals__item">{arrival.time.slice(11, 16)}</div>
                <div className={`arrivals__item arrivals__item--${beIn[index]}`}>{beIn[index]}</div>
              </div>
            ))
          ) : (
            <div>{error ? error : "No arrivals by this request"}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArrivalsPage;
