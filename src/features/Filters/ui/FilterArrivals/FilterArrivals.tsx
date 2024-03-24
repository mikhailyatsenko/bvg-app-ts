import { useSelector } from "react-redux";
import { getArrivals } from "features/LoadArrivals";
import { useEffect, useState } from "react";
import { FilterDropdown } from "entities/FilterDropdown";
import { type Arrivals, type Arrival } from "features/LoadArrivals/model/types/ArrivalsSchema";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { type ArrivalsFilters } from "../../model/types/FiltersSchema";
import { getArrivalsFilters } from "features/Filters";
import { filtersActions } from "features/Filters/model/slice/filterSlice";
import { getFilteredArrivals } from "features/Filters/model/selectors/getFilteredArrivals";
import { getIsFiltered } from "features/Filters/model/selectors/getIsFiltered";
import cls from "./FilterArrivals.module.scss";

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
  const filters = useSelector(getArrivalsFilters);
  const [filterParameters, setFilterParameters] = useState<FilterPatameters>({
    types: [],
    routeNumbers: [],
    destinations: [],
  });

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
      const filterKeys = Object.keys(filters) as Array<keyof ArrivalsFilters>;
      return filterKeys.every((key: keyof ArrivalsFilters) => {
        if (!filters[key]) {
          return true;
        }
        return arrival[key] === filters[key];
      });
    };

    const filtered = arrivals.filter(applyFilters);

    if (filtered.length !== arrivals.length) {
      dispatch(filtersActions.setFilteredArrivals(filtered));
      dispatch(filtersActions.setIsFiltered(true));
    } else {
      dispatch(filtersActions.setIsFiltered(false));
    }
  }, [arrivals, dispatch, filters]);
  return (
    <div className={cls.FilterArrivals}>
      <FilterDropdown
        filterTitle="Transport type"
        values={filterParameters.types}
        selectValue={filters.type ?? ""}
        onSelect={(value) => {
          if (value === "") {
            dispatch(filtersActions.setFilters({ ...filters, type: "" }));
          } else dispatch(filtersActions.setFilters({ ...filters, type: value }));
        }}
      />
      <FilterDropdown
        filterTitle="Route number"
        selectValue={filters.routeNumber ?? ""}
        values={filterParameters.routeNumbers}
        onSelect={(value) => {
          if (value === "") {
            dispatch(filtersActions.setFilters({ ...filters, routeNumber: "" }));
          } else dispatch(filtersActions.setFilters({ ...filters, routeNumber: value }));
        }}
      />
      {/* <label>Destination:</label> */}
      <FilterDropdown
        filterTitle="Destination"
        selectValue={filters.destination ?? ""}
        values={filterParameters.destinations}
        onSelect={(value) => {
          if (value === "") {
            dispatch(filtersActions.setFilters({ ...filters, destination: "" }));
          } else dispatch(filtersActions.setFilters({ ...filters, destination: value }));
        }}
      />
    </div>
  );
};
