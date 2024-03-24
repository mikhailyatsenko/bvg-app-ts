import { type Arrivals } from "features/LoadArrivals";

export interface ArrivalsFilters {
  type: string;
  routeNumber: string;
  destination: string;
}

export interface FiltersSchema {
  isFiltered: boolean;
  arrivalsFilters: ArrivalsFilters;
  intervalArrivals: string;
  filteredArrivals: Arrivals;
}
