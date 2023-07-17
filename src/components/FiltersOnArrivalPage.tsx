import React from "react";
import { Filters } from "../types";

const FiltersOnArrivalPage: React.FC<{
  parametrsToFilterArrival: string[][];
  changeArrivalsFilter: (filterType: string, filterBy: string) => void;
  changePeriod: (period: string) => void;
  filters: Filters;
  filteredPeriod: string;
}> = ({ parametrsToFilterArrival, changeArrivalsFilter, changePeriod, filters, filteredPeriod }) => {
  const selectFilters = ["type", "routeNumber", "destination"];
  return (
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
      <select value={filteredPeriod} onChange={(event) => changePeriod(event.target.value)} className="arrivals__item">
        <option value="10">10 minutes</option>
        <option value="20">20 minutes</option>
        <option value="30">30 minutes</option>
        <option value="40">40 minutes</option>
      </select>
      <select className="arrivals__item">
        <option value="">Sort</option>
      </select>
    </div>
  );
};

export default FiltersOnArrivalPage;
