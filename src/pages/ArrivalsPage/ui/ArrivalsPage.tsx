import { AddToFavorites } from "features/AddToFavorites";
import { DisplayArrivals, getIsLoading } from "features/LoadArrivals";
import { CombinedFilters } from "widgets/CombinedFilters";

const ArrivalsPage = () => {
  return (
    <>
      <AddToFavorites />
      <CombinedFilters />
      <DisplayArrivals />
    </>
  );
};

export default ArrivalsPage;
