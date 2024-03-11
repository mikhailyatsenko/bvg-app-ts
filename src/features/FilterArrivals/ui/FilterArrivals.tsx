import { useSelector } from "react-redux";
import { getArrivals } from "features/LoadArrivals";
import { useEffect, useState } from "react";
import FilterDropdown from "./FilterDropdown/FilterDropdown";
import { type Arrival } from "features/LoadArrivals/model/types/ArrivalsSchema";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { arrivalsActions } from "features/LoadArrivals/model/slice/arrivalsSlice";

export interface Filter {
  type?: string;
  routeNumber?: string;
  destination?: string;
}

export const FilterArrivals = () => {
  const dispatch = useAppDispatch();
  const arrivals = useSelector(getArrivals);

  const [filters, setFilters] = useState<Filter>({});

  const types = [...new Set(arrivals.map((arrival) => arrival.type))];
  const routeNumbers = [...new Set(arrivals.map((arrival) => arrival.routeNumber))];
  const destinations = [...new Set(arrivals.map((arrival) => arrival.destination))];

  const applyFilters = (arrival: Arrival) => {
    const filterKeys = Object.keys(filters) as Array<keyof Filter>;
    return filterKeys.every((key: keyof Filter) => {
      if (!filters[key]) return true;
      return arrival[key] === filters[key];
    });
  };
  const filteredArrivals = arrivals.filter(applyFilters);

  useEffect(() => {
    if (arrivals.length !== filteredArrivals.length) {
      dispatch(arrivalsActions.setArrivals(filteredArrivals));
    }
  }, [arrivals, dispatch, filteredArrivals]);

  return (
    <div>
      <h2>Filters:</h2>
      <div>
        <label>Type:</label>
        <FilterDropdown
          values={types}
          onSelect={(value) => {
            setFilters({ ...filters, type: value });
          }}
        />
      </div>
      <div>
        <label>Route Number:</label>
        <FilterDropdown
          values={routeNumbers}
          onSelect={(value) => {
            setFilters({ ...filters, routeNumber: value });
          }}
        />
      </div>
      <div>
        <label>Destination:</label>

        <FilterDropdown
          values={destinations}
          onSelect={(value) => {
            setFilters({ ...filters, destination: value });
          }}
        />
      </div>

      <h2>Filtered Arrivals:</h2>
      <ul>
        {arrivals.map((arrival, index) => (
          <li key={index}>
            Type: {arrival.type}, Time: {arrival.time}, Route Number: {arrival.routeNumber}, Destination:{" "}
            {arrival.destination}
          </li>
        ))}
      </ul>
    </div>
  );
};
