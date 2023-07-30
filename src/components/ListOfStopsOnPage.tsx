import React from "react";
import { StopType } from "../types";
import { useTypedSelector } from "../hooks/useTypedSelector";

type StopsOnPageProps = {
  isLoading: boolean;
  stopsToRender: StopType[];
  favoriteStops: StopType[];
  searchInputValue: string;
  selectStop: (id: string, name: string) => void;
  removeAllFavoritesStops: () => void;
};

const ListOfStopsOnPage: React.FC<StopsOnPageProps> = ({
  isLoading,
  stopsToRender,
  favoriteStops,
  searchInputValue,
  removeAllFavoritesStops,
  selectStop,
}) => {
  let stops = !searchInputValue && favoriteStops.length ? favoriteStops : stopsToRender;
  const reduxState = useTypedSelector((state) => state.arrivals);
  console.log("redux-state", reduxState);
  return (
    <div className="stops-list">
      {stops.map((stop: StopType) => (
        <div className="btn btn--velvet" key={stop.id} onClick={() => selectStop(stop.id, stop.name)}>
          {stop.name}
        </div>
      ))}
      {!searchInputValue && Boolean(favoriteStops.length) && (
        <div className="stops-list__fav-description fav-descr">
          <div className="fav-descr__text">This is your favorites stops.</div>
          <div className="fav-descr__text">
            <i>Need another stop? Start type name of the stop or</i>
          </div>
          <button className="btn btn--red" onClick={removeAllFavoritesStops}>
            <span className="material-symbols-outlined">delete_forever</span>
            Remove all favorites stops
          </button>
        </div>
      )}
    </div>
  );
};

export default ListOfStopsOnPage;
