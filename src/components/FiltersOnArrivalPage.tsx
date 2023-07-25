import React from "react";
import { Filters } from "../types";

const FiltersOnArrivalPage: React.FC<{
  parametrsToFilterArrival: string[][];
  changeArrivalsFilter: (filterType: string, filterBy: string) => void;
  changePeriod: (period: string) => void;
  filters: Filters;
  filteredPeriod: string;
  resetAllArrivalsFilters: () => void;
}> = ({
  parametrsToFilterArrival,
  changeArrivalsFilter,
  changePeriod,
  filters,
  filteredPeriod,
  resetAllArrivalsFilters,
}) => {
  const selectFilters = ["type", "routeNumber", "destination"];
  return (
    <>
      <div className="arrivals__line">
        <div className="arrivals__item">Type of transport</div>
        <div className="arrivals__item">Route number</div>
        <div className="arrivals__item">Destination</div>
        <div className="arrivals__item">Arrival time</div>
        <div className="arrivals__item">Be in</div>
      </div>
      <div className="arrivals__line">
        {selectFilters.map((filter, index) => (
          <select
            value={filters[filter as keyof typeof filters]}
            key={index}
            onChange={(event) => {
              changeArrivalsFilter(filter, event.target.value);
            }}
            className="arrivals__item"
          >
            <option value="">All</option>
            {parametrsToFilterArrival[index].map((filterBy, index) => (
              <option key={index} value={filterBy}>
                {filterBy}
              </option>
            ))}
          </select>
        ))}
        <select
          value={filteredPeriod}
          onChange={(event) => changePeriod(event.target.value)}
          className="arrivals__item"
        >
          <option value="10">10 minutes</option>
          <option value="20">20 minutes</option>
          <option value="30">30 minutes</option>
          <option value="40">40 minutes</option>
        </select>
        <div className="arrivals__item">
          {filters.type || filters.routeNumber || filters.destination || filteredPeriod !== "10" ? (
            <div onClick={resetAllArrivalsFilters} className="reset-filters-button">
              <span className="material-symbols-outlined">restart_alt</span>
              Reset all filters
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FiltersOnArrivalPage;
