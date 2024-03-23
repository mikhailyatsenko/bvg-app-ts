import { FilterArrivals } from "features/Filters";
import { PullOutFilters } from "features/PullOutFilters";

export const FiltersPanel = () => {
  return (
    <PullOutFilters>
      <FilterArrivals />
    </PullOutFilters>
  );
};
