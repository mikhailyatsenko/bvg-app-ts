import { AddToFavorites } from "features/AddToFavorites";
import { BackToMain } from "features/BackToMain";
import { LoadArrivals } from "features/LoadArrivals";
import { FiltersPanel } from "widgets/FiltersPanel";

const ArrivalsPage = () => {
  return (
    <>
      <FiltersPanel />
      <BackToMain />
      <AddToFavorites />
      <LoadArrivals />
    </>
  );
};

export default ArrivalsPage;
