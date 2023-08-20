import React, { useState, useEffect } from "react";
import ListOfStopsOnPage from "../components/ListOfStopsOnPage";
import ArrivalsPage from "../components/ArrivalsPage";
import SearchStop from "../components/SearchStop";
import AddToFavorites from "../components/AddToFavorites";
import _stopsList from "../stopsList.json";

import { StopType } from "../types/MainTypes";

import { useTypedSelector } from "../hooks/useTypedSelector";
// import { useDispatch } from "react-redux";

import { useActions } from "../hooks/useActions";
const StopsLoader: React.FC = () => {
  const stopsList = _stopsList as StopType[];
  // const dispatch: any = useDispatch();
  const {
    fetchArrivalsAction,
    updateInputAction,
    selectStopAction,
    beInCalculateAction,
    changePeriodAction,
    setParametersToFilterArrivalsAction,
    changeArrivalsFiltersAction,
    setFilteredArrivalsAction,
    resetAllFiltersAction,
    setFavoriteStopsAction,
    setIsStopInFavAction,
  } = useActions();

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
    updateInputAction(value);
  };

  const selectStop = (id: string, name: string): void => {
    selectStopAction({ id: id, name: name });
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
    changeArrivalsFiltersAction({ filterType: "type", filterBy: "" });
    changeArrivalsFiltersAction({ filterType: "routeNumber", filterBy: "" });
    changeArrivalsFiltersAction({ filterType: "routeNumber", filterBy: "" });
    changePeriodAction("10");
    setFilteredArrivalsAction(null);
  }, [selectedStop]);

  useEffect(() => {
    const checkIsStopInFav = (): void => {
      if (JSON.stringify(favoriteStops) !== localStorage.getItem("favStops")) {
        setFavoriteStopsAction(JSON.parse(localStorage.getItem("favStops")!));
      }
      if (favoriteStops.find((stop) => stop.id === selectedStop.id)) {
        setIsStopInFavAction(true);
      } else {
        setIsStopInFavAction(false);
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
      fetchArrivalsAction();
    }
  }, [selectedStop, filteredPeriod]);

  useEffect(() => {
    if (arrivals.length) {
      let accumBeIn: string[] = [];
      arrivals.forEach((arrival) => {
        accumBeIn.push(minutesToArrival(arrival.time));
      });
      beInCalculateAction(accumBeIn);

      const interval: NodeJS.Timer = setInterval(() => {
        let accumBeIn: string[] = [];
        arrivals.forEach((arrival) => {
          accumBeIn.push(minutesToArrival(arrival.time));
          beInCalculateAction(accumBeIn);
        });
      }, 10000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivals, filteredArrivals]);

  useEffect(() => {
    if (arrivals.length) {
      if (!filters.type && !filters.routeNumber && !filters.destination) {
        setFilteredArrivalsAction(null);
      } else {
        setFilteredArrivalsAction(
          arrivals
            .filter((arrival) => arrival.type === (filters.type || arrival.type))
            .filter((arrival) => arrival.routeNumber === (filters.routeNumber || arrival.routeNumber))
            .filter((arrival) => arrival.destination === (filters.destination || arrival.destination))
        );
      }
    }
  }, [filters, arrivals]);

  useEffect(() => {
    if (arrivals.length) {
      setParametersToFilterArrivalsAction([[], [], []]);
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
      setParametersToFilterArrivalsAction(accumAllParameters);
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
    changePeriodAction(period);
  };

  const changeArrivalsFilter = (filterType: string, filterBy: string): void => {
    changeArrivalsFiltersAction({ filterType, filterBy });
  };

  const resetAllArrivalsFilters = () => {
    resetAllFiltersAction();
  };

  const addToFav = (): void => {
    const tempFavStops: StopType[] = Object.assign(favoriteStops);
    if (isStopInFav) {
      console.log("stop in fav, so remoovimg");
      console.log(
        "making state like this:",
        tempFavStops.filter((favStop) => favStop.id !== selectedStop.id)
      );
      setFavoriteStopsAction(tempFavStops.filter((favStop) => favStop.id !== selectedStop.id));
    } else {
      console.log("stop is not in fav, so pushing");
      console.log("making adding to state:", selectedStop);
      setFavoriteStopsAction([...tempFavStops, selectedStop]);
    }
  };

  const removeAllFavoritesStops = (): void => {
    setFavoriteStopsAction([]);
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
