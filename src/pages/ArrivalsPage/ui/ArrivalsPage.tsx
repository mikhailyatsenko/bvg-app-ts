import { AddToFavorites } from "features/AddToFavorites";
import { BackToSearch } from "features/BackToSearch";
import { LoadArrivals } from "features/LoadArrivals";
import { FiltersPanel } from "widgets/FiltersPanel";
import cls from "./ArrivalsPage.module.scss";

const ArrivalsPage = () => {
  return (
    <div className={cls.ArrivalsPage}>
      <FiltersPanel />
      <BackToSearch />
      <AddToFavorites />
      <LoadArrivals />
    </div>
  );
};

export default ArrivalsPage;
