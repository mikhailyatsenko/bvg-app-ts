import { useSelector } from "react-redux";
import { getArrivals } from "features/LoadArrivals";
import { useEffect, useState } from "react";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import { type Arrivals, type Arrival } from "features/LoadArrivals/model/types/ArrivalsSchema";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { type Filters } from "../../model/types/FilterArrivalsSchema";
import { getFilters } from "features/FilterArrivals";
import { filterArrilavsActions } from "features/FilterArrivals/model/slice/filterArrilavsSlice";
import { getFilteredArrivals } from "features/FilterArrivals/model/selectors/getFilteredArrivals";
import { getIsFiltered } from "features/FilterArrivals/model/selectors/getIsFiltered";

export interface FilterPatameters {
  types: string[];
  routeNumbers: string[];
  destinations: string[];
}

export const FilterArrivals = () => {
  const dispatch = useAppDispatch();
  const isFiltered = useSelector(getIsFiltered);
  const arrivals = useSelector(getArrivals);
  const filteredArrivals = useSelector(getFilteredArrivals);
  const filters = useSelector(getFilters);
  const [filterParameters, setFilterParameters] = useState<FilterPatameters>({
    types: [],
    routeNumbers: [],
    destinations: [],
  });

  useEffect(() => {
    dispatch(filterArrilavsActions.setIsFiltered(Object.values(filters).some((value) => value !== "")));
  }, [dispatch, filters]);

  useEffect(() => {
    const generateFilterParameters = (currentArrivals: Arrivals) => {
      const types = [...new Set(currentArrivals.map((arrival) => arrival.type))];
      const routeNumbers = [...new Set(currentArrivals.map((arrival) => arrival.routeNumber))];
      const destinations = [...new Set(currentArrivals.map((arrival) => arrival.destination))];
      setFilterParameters({
        types,
        routeNumbers,
        destinations,
      });
    };
    if (isFiltered) {
      generateFilterParameters(filteredArrivals);
    } else {
      generateFilterParameters(arrivals);
    }
  }, [isFiltered, arrivals, filteredArrivals]);

  useEffect(() => {
    const applyFilters = (arrival: Arrival) => {
      const filterKeys = Object.keys(filters) as Array<keyof Filters>;
      return filterKeys.every((key: keyof Filters) => {
        if (!filters[key]) {
          console.log("filter[key]", filters[key], "return true");
          return true;
        }
        return arrival[key] === filters[key];
      });
    };

    const filtered = arrivals.filter(applyFilters);

    if (JSON.stringify(filtered) !== JSON.stringify(arrivals)) {
      dispatch(filterArrilavsActions.setFilteredArrivals(filtered));
    }
  }, [arrivals, dispatch, filters]);

  return (
    <div>
      <h2>Filters:</h2>
      <div>
        <label>Type:</label>
        <FilterDropdown
          values={filterParameters.types}
          selectValue={filters.type ?? ""}
          onSelect={(value) => {
            if (value === "") {
              dispatch(filterArrilavsActions.setFilters({ ...filters, type: "" }));
            } else dispatch(filterArrilavsActions.setFilters({ ...filters, type: value }));
          }}
        />
      </div>
      <div>
        <label>Route Number:</label>
        <FilterDropdown
          selectValue={filters.routeNumber ?? ""}
          values={filterParameters.routeNumbers}
          onSelect={(value) => {
            if (value === "") {
              dispatch(filterArrilavsActions.setFilters({ ...filters, routeNumber: "" }));
            } else dispatch(filterArrilavsActions.setFilters({ ...filters, routeNumber: value }));
          }}
        />
      </div>
      <div>
        <label>Destination:</label>

        <FilterDropdown
          selectValue={filters.destination ?? ""}
          values={filterParameters.destinations}
          onSelect={(value) => {
            if (value === "") {
              dispatch(filterArrilavsActions.setFilters({ ...filters, destination: "" }));
            } else dispatch(filterArrilavsActions.setFilters({ ...filters, destination: value }));
          }}
        />
      </div>
    </div>
  );
};
