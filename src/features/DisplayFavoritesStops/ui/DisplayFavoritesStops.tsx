import { ButtonWithFavStop } from "entities/ButtonWithFavStop";
import { useSelector } from "react-redux";
import { getFavoritesStops } from "features/AddToFavorites/model/selectors/getFavoritesStops/getFavoritesStops";
import cls from "./DisplayFavoritesStops.module.scss";

export const DisplayFavoritesStops = () => {
  const favoritesStops = useSelector(getFavoritesStops);
  return (
    <div className={cls.DisplayFavoritesStops}>
      {favoritesStops.length
        ? favoritesStops.map((stop) => (
            <ButtonWithFavStop isFav={true} key={stop.id} selectStopHandler={console.log} stop={stop} />
          ))
        : ""}
    </div>
  );
};
