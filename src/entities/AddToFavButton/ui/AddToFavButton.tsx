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
