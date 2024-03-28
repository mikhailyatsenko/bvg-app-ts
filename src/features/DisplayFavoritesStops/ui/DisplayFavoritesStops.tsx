import { ButtonWithFavStop } from "entities/ButtonWithFavStop";
import { useSelector } from "react-redux";
import { getFavoritesStops } from "features/AddToFavorites/model/selectors/getFavoritesStops/getFavoritesStops";
import cls from "./DisplayFavoritesStops.module.scss";
import { useNavigate } from "react-router-dom";
import { type Stop } from "features/Stops";

export const DisplayFavoritesStops = () => {
  const favoritesStops = useSelector(getFavoritesStops);
  const navigate = useNavigate();
  const selectStopHandler = (selectedStop: Stop): void => {
    navigate(`/arrivals?id=${selectedStop.id}`, { state: { stopName: selectedStop.name } });
  };
  return (
    <div className={cls.DisplayFavoritesStops}>
      {favoritesStops.length
        ? favoritesStops.map((stop) => (
            <ButtonWithFavStop isFav={true} key={stop.id} selectStopHandler={selectStopHandler} stop={stop} />
          ))
        : ""}
    </div>
  );
};
