import React, { useEffect } from "react";
import ListOfStopsOnPage from "../components/ListOfStopsOnPage";
import ArrivalsPage from "../components/ArrivalsPage";
import SearchStop from "../components/SearchStop";
import AddToFavorites from "../components/AddToFavorites";
import _stopsList from "../stopsList.json";

import { StopType } from "../types/MainTypes";

import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const StopsLoader: React.FC = () => {
  const stopsList = _stopsList as StopType[];
  const {
    updateInput,
    selectStop,
    fetchArrivalsAction,
    beInCalculate,
    changePeriod,
    setParametersToFilterArrivals,
    changeArrivalsFilters,
    setFilteredArrivals,
    resetAllFilters,
    setFavoriteStop,
    setIsStopInFav,
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
    updateInput(value);
  };

  const selectStopHandler = (id: string, name: string): void => {
    selectStop({ id: id, name: name });
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
    resetAllFilters();
    setFilteredArrivals(null);
  }, [selectedStop]);

  useEffect(() => {
    const checkIsStopInFav = (): void => {
      if (JSON.stringify(favoriteStops) !== localStorage.getItem("favStops")) {
        setFavoriteStop(JSON.parse(localStorage.getItem("favStops")!));
      }
      if (favoriteStops.find((stop) => stop.id === selectedStop.id)) {
        setIsStopInFav(true);
      } else {
        setIsStopInFav(false);
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
      beInCalculate(accumBeIn);
    }

    const interval: NodeJS.Timer = setInterval(() => {
      let accumBeIn: string[] = [];
      arrivals.forEach((arrival) => {
        accumBeIn.push(minutesToArrival(arrival.time));
      });
      beInCalculate(accumBeIn);
    }, 10000);

    return () => clearInterval(interval);
  }, [arrivals, filteredArrivals]);

  useEffect(() => {
    if (arrivals.length) {
      if (!filters.type && !filters.routeNumber && !filters.destination) {
        setFilteredArrivals(null);
      } else {
        setFilteredArrivals(
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
      setParametersToFilterArrivals([[], [], []]);
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
      setParametersToFilterArrivals(accumAllParameters);
    }
  }, [filteredArrivals, arrivals]);

  const minutesToArrival = (arrivalTime: string): string => {
    let arrival: Date = new Date(arrivalTime);
    let now: Date = new Date();
    let difference = Math.round((arrival.getTime() - now.getTime()) / (1000 * 60));

    if (difference > 0) {
      return `~ ${difference} min`;
    } else if (difference < -1) {
      return "gone";
    } else return "now";
  };

  const changePeriodHandler = (period: string): void => {
    changePeriod(period);
  };

  const changeArrivalsFilter = (filterType: string, filterBy: string): void => {
    //filterType - parameter by what in general user wat filtered arrivals: Type of transport("type") or Route Number("routeNumber") or Destintion("destination")
    //filterBy - for expampel Bus, Tram.., M43, U9, S2.., S Südkreuz..
    changeArrivalsFilters({ filterType, filterBy });
  };

  const resetAllArrivalsFilters = () => {
    resetAllFilters();
  };

  const addToFav = (): void => {
    const tempFavStops: StopType[] = Object.assign(favoriteStops);
    if (isStopInFav) {
      console.log("stop in fav, so remoovimg");
      console.log(
        "making state like this:",
        tempFavStops.filter((favStop) => favStop.id !== selectedStop.id)
      );
      setFavoriteStop(tempFavStops.filter((favStop) => favStop.id !== selectedStop.id));
    } else {
      console.log("stop is not in fav, so pushing");
      console.log("making adding to state:", selectedStop);
      setFavoriteStop([...tempFavStops, selectedStop]);
    }
  };

  const removeAllFavoritesStops = (): void => {
    setFavoriteStop([]);
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
          selectStopHandler={selectStopHandler}
        />
      )}

      {selectedStop.id && (
        <ArrivalsPage
          changeArrivalsFilter={changeArrivalsFilter}
          changePeriodHandler={changePeriodHandler}
          resetAllArrivalsFilters={resetAllArrivalsFilters}
        />
      )}
      {selectedStop.id && <AddToFavorites addToFav={addToFav} />}
    </main>
  );
};

export default StopsLoader;
