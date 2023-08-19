import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";

const AddToFavorites: React.FC<{ addToFav: () => void }> = ({ addToFav }) => {
  const { isStopInFav } = useTypedSelector((state) => state.arrivals);
  return (
    <div className="arrivals-section__add-to-fav drop-fav" onClick={() => addToFav()}>
      <div
        className={
          isStopInFav ? "material-symbols-outlined fav filled animate" : "material-symbols-outlined fav"
        }
      >
        favorite
      </div>
      <div>{isStopInFav ? <span style={{ color: "#f15bb5" }}>in favorites</span> : "to favorites"}</div>
    </div>
  );
};

export default AddToFavorites;
