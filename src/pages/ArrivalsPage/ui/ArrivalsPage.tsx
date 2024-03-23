import { AddToFavorites } from "features/AddToFavorites";
import { BackToMain } from "features/BackToMain";
import { DisplayArrivals } from "features/LoadArrivals";
import { FiltersPanel } from "widgets/FiltersPanel";

const ArrivalsPage = () => {
  return (
    <>
      <FiltersPanel />
      <BackToMain />
      <AddToFavorites />
      <DisplayArrivals />
    </>
  );
};

export default ArrivalsPage;
