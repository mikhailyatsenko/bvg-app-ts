import { AddToFavorites } from "features/AddToFavorites";
import { DisplayArrivals } from "features/LoadArrivals";
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
