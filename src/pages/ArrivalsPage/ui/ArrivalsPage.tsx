import { FilterArrivals } from "features/FilterArrivals";
import { ArrivalsTable } from "features/LoadArrivals";

const ArrivalsPage = () => {
  return (
    <>
      <FilterArrivals />
      <ArrivalsTable />
    </>
  );
};

export default ArrivalsPage;
