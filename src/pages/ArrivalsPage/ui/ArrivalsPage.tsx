import { ArrivalsTable } from "features/LoadArrivals";
import { CombinedFilters } from "widgets/CombinedFilters";

const ArrivalsPage = () => {
  return (
    <>
      <CombinedFilters />
      <ArrivalsTable />
    </>
  );
};

export default ArrivalsPage;
