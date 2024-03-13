import { type Arrivals } from "features/LoadArrivals";

export interface Filters {
  type: string;
  routeNumber: string;
  destination: string;
}

export interface FilterArrivalsSchema {
  isFiltered: boolean;
  filters: Filters;
  filteredArrivals: Arrivals;
}
