// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite-plugin-svgr/client" />
import FavoriteIconEmpty from "shared/assets/icons/favorite-empty.svg?react";
import FavoriteIconFilled from "shared/assets/icons/favorite-filled.svg?react";

interface AddToFavButtonProps {
  handleFavoriteToggle: () => void;
  isFavorite: boolean;
}

export const AddToFavButton = ({ handleFavoriteToggle, isFavorite }: AddToFavButtonProps) => {
  return (
    <div
      className={`arrivals-section__add-to-fav drop-fav${isFavorite ? " filled animate" : ""}`}
      onClick={() => {
        handleFavoriteToggle();
      }}
    >
      <div>{isFavorite ? <span style={{ color: "#f15bb5" }}>in favorites</span> : "to favorites"}</div>
    </div>
  );
};
