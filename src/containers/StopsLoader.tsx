import React, { useState, useEffect } from "react";
import ListOfStopsOnPage from "../components/ListOfStopsOnPage";
import ArrivalsPage from "../components/ArrivalsPage";
import SearchStop from "../components/SearchStop";
import AddToFavorites from "../components/AddToFavorites";
import _stopsList from "../stopsList.json";

import { StopType } from "../types/MainTypes";

import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";

import { updateInputAction } from "../store/action-creators/updateInputAction";
import { selectStopAction } from "../store/action-creators/selectStopAction";
import { fetchArrivalsAction } from "../store/action-creators/fetchArrivalsAction";
import { beInCalculateAction } from "../store/action-creators/beInCalculateAction";
import { changePeriodAction } from "../store/action-creators/changePeriodAction";
import { setParametersToFilterArrivalsAction } from "../store/action-creators/setParametersToFilterArrivalsAction";
import { changeArrivalsFiltersAction } from "../store/action-creators/changeArrivalsFiltersAction";
import { setFilteredArrivalsAction } from "../store/action-creators/setFilteredArrivalsAction";
import { resetAllFiltersAction } from "../store/action-creators/resetAllFiltersAction";
import { setFavoriteStopsAction } from "../store/action-creators/setFavoriteStopsAction";
import { setIsStopInFavAction } from "../store/action-creators/setIsStopInFavAction";

const StopsLoader: React.FC = () => {
  const stopsList = _stopsList as StopType[];
  const dispatch: any = useDispatch();

  const { searchInputValue, favoriteStops, selectedStop, arrivals, isStopInFav } = useTypedSelector(
    (state) => state.arrivals
  );

  const { filteredPeriod, filters, filteredArrivals } = useTypedSelector((state) => state.filters);

  const stopsToRender = stopsList
    .filter((stop) => {
      return stop.name.toLowerCase().includes(searchInputValue.toLowerCase());
    })
    .slice(0, 100);

  const updateSearchInput = (value: string): void => {
    dispatch(updateInputAction(value));
  };

  const selectStop = (id: string, name: string): void => {
    dispatch(selectStopAction({ id: id, name: name }));
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("favStops")!) === null) {
      localStorage.setItem("favStops", JSON.stringify([]));
    }

    if (favoriteStops.length !== JSON.parse(localStorage.getItem("favStops")!).length) {
      console.log("useeffect reacted on change favStops and fav stops list making ls is:", favoriteStops);
      localStorage.setItem("favStops", JSON.stringify(favoriteStops));
    }
  }, [favoriteStops]);

  useEffect(() => {
    dispatch(changeArrivalsFiltersAction({ filterType: "type", filterBy: "" }));
    dispatch(changeArrivalsFiltersAction({ filterType: "routeNumber", filterBy: "" }));
    dispatch(changeArrivalsFiltersAction({ filterType: "routeNumber", filterBy: "" }));
    dispatch(changePeriodAction("10"));
    dispatch(setFilteredArrivalsAction(null));
  }, [selectedStop]);

  useEffect(() => {
    const checkIsStopInFav = (): void => {
      if (JSON.stringify(favoriteStops) !== localStorage.getItem("favStops")) {
        dispatch(setFavoriteStopsAction(JSON.parse(localStorage.getItem("favStops")!)));
      }
      if (favoriteStops.find((stop) => stop.id === selectedStop.id)) {
        dispatch(setIsStopInFavAction(true));
      } else {
        dispatch(setIsStopInFavAction(false));
      }
    };

    if (selectedStop.id) {
      checkIsStopInFav();
    }

    window.addEventListener("storage", checkIsStopInFav);
    return () => {
      window.addEventListener("storage", checkIsStopInFav);
    };
  }, [selectedStop, favoriteStops]);

  useEffect(() => {
    if (selectedStop.id) {
      dispatch(fetchArrivalsAction());
    }
  }, [selectedStop, filteredPeriod]);

  useEffect(() => {
    if (arrivals.length) {
      let accumBeIn: string[] = [];
      arrivals.forEach((arrival) => {
        accumBeIn.push(minutesToArrival(arrival.time));
      });
      dispatch(beInCalculateAction(accumBeIn));

      const interval: NodeJS.Timer = setInterval(() => {
        let accumBeIn: string[] = [];
        arrivals.forEach((arrival) => {
          accumBeIn.push(minutesToArrival(arrival.time));
          dispatch(beInCalculateAction(accumBeIn));
        });
      }, 10000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivals, filteredArrivals]);

  useEffect(() => {
    if (arrivals.length) {
      if (!filters.type && !filters.routeNumber && !filters.destination) {
        dispatch(setFilteredArrivalsAction(null));
      } else {
        dispatch(
          setFilteredArrivalsAction(
            arrivals
              .filter((arrival) => arrival.type === (filters.type || arrival.type))
              .filter((arrival) => arrival.routeNumber === (filters.routeNumber || arrival.routeNumber))
              .filter((arrival) => arrival.destination === (filters.destination || arrival.destination))
          )
        );
      }
    }
  }, [filters, arrivals]);

  useEffect(() => {
    if (arrivals.length) {
      dispatch(setParametersToFilterArrivalsAction([[], [], []]));
      const generateParametrsToFilterArrival = (filterBy: string) => {
        return (filteredArrivals || arrivals).reduce((parametersAccum, currentArrival) => {
          if (!parametersAccum.includes(currentArrival[filterBy as keyof typeof currentArrival])) {
            return [...parametersAccum, currentArrival[filterBy as keyof typeof currentArrival]];
          } else return parametersAccum;
        }, [] as string[]);
      };
      let accumAllParameters: string[][] = [];
      ["type", "routeNumber", "destination"].forEach((filterBy) => {
        accumAllParameters.push(generateParametrsToFilterArrival(filterBy));
      });
      dispatch(setParametersToFilterArrivalsAction(accumAllParameters));
    }
  }, [filteredArrivals, arrivals]);

  const minutesToArrival = (arrivalTime: string): string => {
    let arrival: Date = new Date(arrivalTime);
    let now: Date = new Date();
    let difference = Math.round((arrival.getTime() - now.getTime()) / (1000 * 60));

    if (difference > 0) {
      return `~ ${difference} min`;
    } else if (difference < 0) {
      return "gone";
    } else return "now";
  };

  const changePeriod = (period: string): void => {
    dispatch(changePeriodAction(period));
  };

  const changeArrivalsFilter = (filterType: string, filterBy: string): void => {
    dispatch(changeArrivalsFiltersAction({ filterType, filterBy }));
  };

  const resetAllArrivalsFilters = () => {
    dispatch(resetAllFiltersAction());
  };

  const addToFav = (): void => {
    const tempFavStops: StopType[] = Object.assign(favoriteStops);
    if (isStopInFav) {
      console.log("stop in fav, so remoovimg");
      console.log(
        "making state like this:",
        tempFavStops.filter((favStop) => favStop.id !== selectedStop.id)
      );
      dispatch(setFavoriteStopsAction(tempFavStops.filter((favStop) => favStop.id !== selectedStop.id)));
    } else {
      console.log("stop is not in fav, so pushing");
      console.log("making adding to state:", selectedStop);
      dispatch(setFavoriteStopsAction([...tempFavStops, selectedStop]));
      // tempFavStops.push(selectedStop)
      // setFavoriteStops(() => [...favoriteStops, selectedStop]);
    }
  };

  const removeAllFavoritesStops = (): void => {
    dispatch(setFavoriteStopsAction([]));
    // setFavoriteStops([]);
    localStorage.setItem("favStops", "[]");
  };
  return (
    <main>
      <SearchStop
        updateSearchInput={updateSearchInput}
        searchInputValue={searchInputValue}
        selectedStop={selectedStop}
      />

      {!selectedStop.id && (
        <ListOfStopsOnPage
          stopsToRender={stopsToRender}
          removeAllFavoritesStops={removeAllFavoritesStops}
          selectStop={selectStop}
        />
      )}

      {selectedStop.id && (
        <ArrivalsPage
          changeArrivalsFilter={changeArrivalsFilter}
          changePeriod={changePeriod}
          resetAllArrivalsFilters={resetAllArrivalsFilters}
        />
      )}
      {selectedStop.id && <AddToFavorites addToFav={addToFav} />}
    </main>
  );
};

export default StopsLoader;
