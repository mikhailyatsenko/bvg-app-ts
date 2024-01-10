import React from "react";
import { StopType } from "../types/MainTypes";
import { useTypedSelector } from "../hooks/useTypedSelector";

type StopsOnPageProps = {
  stopsToRender: StopType[];
  selectStopHandler: (id: string, name: string) => void;
  removeAllFavoritesStops: () => void;
};

const ListOfStopsOnPage: React.FC<StopsOnPageProps> = ({
  stopsToRender,
  removeAllFavoritesStops,
  selectStopHandler,
}) => {
  const { favoriteStops, searchInputValue } = useTypedSelector((state) => state.arrivals);

  let stops = !searchInputValue && favoriteStops.length ? favoriteStops : stopsToRender;

  return (
    <div className="stops-list">
      {stops.map((stop: StopType) => (
        <div className="btn btn--velvet" key={stop.id} onClick={() => selectStopHandler(stop.id, stop.name)}>
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
