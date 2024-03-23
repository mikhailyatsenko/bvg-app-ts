import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { addToFavoritesActions } from "../model/slice/addToFavoritesSlice";
import { getFavoritesStops } from "../model/selectors/getFavoritesStops/getFavoritesStops";
import { getSelectedStop } from "features/Stops";
import { AddToFavButton } from "entities/AddToFavButton";

export const AddToFavorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedStop = useSelector(getSelectedStop);
  const favoriteStops = useSelector(getFavoritesStops);

  const isFavorite = favoriteStops.some((stop) => selectedStop.id === stop.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(addToFavoritesActions.removeFromFavorites(selectedStop.id));
    } else {
      dispatch(addToFavoritesActions.addToFavorites(selectedStop));
    }
  };

  useEffect(() => {
    dispatch(addToFavoritesActions.initializeFavorites());
  }, [dispatch]);

  return <AddToFavButton handleFavoriteToggle={handleFavoriteToggle} isFavorite={isFavorite} />;
};
