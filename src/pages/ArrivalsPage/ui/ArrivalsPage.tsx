import { AddToFavorites } from "features/AddToFavorites";
import { BackToSearch } from "features/BackToSearch";
import { LoadArrivals } from "features/LoadArrivals";
import { FiltersPanel } from "widgets/FiltersPanel";

const ArrivalsPage = () => {
  return (
    <>
      <FiltersPanel />
      <BackToSearch />
      <AddToFavorites />
      <LoadArrivals />
    </>
  );
};

export default ArrivalsPage;
