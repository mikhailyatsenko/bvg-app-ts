import { AddToFavorites } from "features/AddToFavorites";
import { BackToMain } from "features/BackToMain";
import { DisplayArrivals } from "features/LoadArrivals";
import { CombinedFilters } from "widgets/CombinedFilters";

const ArrivalsPage = () => {
  return (
    <>
      <BackToMain />
      <AddToFavorites />
      <CombinedFilters />
      <DisplayArrivals />
    </>
  );
};

export default ArrivalsPage;
