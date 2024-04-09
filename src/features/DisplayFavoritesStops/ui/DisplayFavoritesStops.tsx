import { ButtonWithFavStop } from "entities/ButtonWithFavStop";
import { useSelector } from "react-redux";
import { getFavoritesStops } from "features/AddToFavorites/model/selectors/getFavoritesStops/getFavoritesStops";
import cls from "./DisplayFavoritesStops.module.scss";
import { useNavigate } from "react-router-dom";
import { type Stop } from "features/LoadArrivals";

interface DisplayFavoritesStopsProps {
  hide: boolean;
}

export const DisplayFavoritesStops = ({ hide }: DisplayFavoritesStopsProps) => {
  const favoritesStops = useSelector(getFavoritesStops);
  const navigate = useNavigate();
  const selectStopHandler = (selectedStop: Stop): void => {
    navigate(`/arrivals?id=${selectedStop.id}`, { state: { stopName: selectedStop.name } });
  };
  return favoritesStops.length ? (
    <div className={`${cls.DisplayFavoritesStops} ${hide ? cls.hide : ""}`}>
      <h3 className={cls.title}>Stops that have been added to favorites:</h3>

      <div className={cls.FavoritesStopsList}>
        {favoritesStops.map((stop) => (
          <ButtonWithFavStop isFav={true} key={stop.id} selectStopHandler={selectStopHandler} stop={stop} />
        ))}
      </div>
    </div>
  ) : (
    ""
  );
};
