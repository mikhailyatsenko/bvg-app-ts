import React, { useEffect } from "react";

const AddToFavorites: React.FC<{ addToFav: () => void; checkIsStopInFav: () => void; isStopInFav: boolean }> = ({
  addToFav,
  checkIsStopInFav,
  isStopInFav,
}) => {
  useEffect(() => {
    checkIsStopInFav();
  }, []);
  return (
    <div className="arrivals-section__add-to-fav drop-fav" onClick={() => addToFav()}>
      <div className={isStopInFav ? "material-symbols-outlined fav filled animate" : "material-symbols-outlined fav"}>favorite</div>
      <div>{isStopInFav ? <span style={{ color: "#f15bb5" }}>in favorites</span> : "to favorites"}</div>
    </div>
  );
};

export default AddToFavorites;
