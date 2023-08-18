import React from "react";
import FiltersOnArrivalPage from "./FiltersOnArrivalPage";
// import { Filters } from "../types/types";
import { useTypedSelector } from "../hooks/useTypedSelector";

const ArrivalsPage: React.FC<{
  // isLoading: boolean;
  // selectedStopName: string;
  // beIn: string[];
  // parametrsToFilterArrival: string[][];
  changeArrivalsFilter: (filterType: string, filterBy: string) => void;
  // filters: Filters;
  changePeriod: (period: string) => void;
  // filteredPeriod: string;
  resetAllArrivalsFilters: () => void;
}> = ({
  // isLoading,
  // selectedStopName,
  // beIn,
  // parametrsToFilterArrival,
  changeArrivalsFilter,
  changePeriod,
  // filters,
  // filteredPeriod,
  resetAllArrivalsFilters,
}) => {
  const { arrivals, isLoading, selectedStop, beIn } = useTypedSelector((state) => state.arrivals);
  // console.log(beIn);
  return (
    <>
      <div className="arrivals-section">
        <h2 className="">{selectedStop.name}</h2>

        <div className="arrivals">
          <FiltersOnArrivalPage
            // parametrsToFilterArrival={parametrsToFilterArrival}
            changeArrivalsFilter={changeArrivalsFilter}
            changePeriod={changePeriod}
            // filters={filters}
            // filteredPeriod={filteredPeriod}
            resetAllArrivalsFilters={resetAllArrivalsFilters}
          />
          {isLoading ? (
            <div className="lds-dual-ring"></div>
          ) : arrivals.length ? (
            arrivals.map((arrival, index) => (
              <div className="arrivals__line" key={index}>
                <div className="arrivals__item">{arrival.type}</div>
                <div className="arrivals__item">{arrival.routeNumber}</div>
                <div className="arrivals__item">{arrival.destination}</div>
                <div className="arrivals__item">{arrival.time.slice(11, 16)}</div>
                <div className={`arrivals__item arrivals__item--${beIn[index]}`}>{beIn[index]}</div>
              </div>
            ))
          ) : (
            <div>No arrivals by this request</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArrivalsPage;
