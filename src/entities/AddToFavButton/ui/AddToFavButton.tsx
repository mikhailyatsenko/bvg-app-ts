import { useState } from "react";
import cls from "./AddToFavButton.module.scss";
import ToastMessage from "shared/ui/ToastMessage/ToastMessage";
import { useSelector } from "react-redux";
import { getSelectedStop } from "features/Stops";

interface AddToFavButtonProps {
  handleFavoriteToggle: () => void;
  isFavorite: boolean;
}

export const AddToFavButton = ({ handleFavoriteToggle, isFavorite }: AddToFavButtonProps) => {
  const [toastMessage, setToastMessage] = useState("");
  const selectedStop = useSelector(getSelectedStop);

  function onClickHandler() {
    if (!isFavorite) {
      setToastMessage(`${selectedStop.name} added to favorites`);
    } else setToastMessage(`${selectedStop.name} removed from favorites`);
  }
  return (
    <div
      className={`${cls.AddToFavButton} ${cls.dropFav} ${isFavorite ? `${cls.filled} ${cls.animate}` : ""}`}
      onClick={() => {
        onClickHandler();
        handleFavoriteToggle();
      }}
    >
      <ToastMessage message={toastMessage} />
    </div>
  );
};
