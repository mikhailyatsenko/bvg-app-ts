import React, { useState, useEffect } from "react";
import ListOfStopsOnPage from "../components/ListOfStopsOnPage";
import ArrivalsPage from "../components/ArrivalsPage";
import SearchStop from "../components/SearchStop";
import AddToFavorites from "../components/AddToFavorites";
import _stopsList from "../stopsList.json";
import { StopType, ArivalsType, NormalizedArrivalType, Filters } from "../types/types";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { updateInput } from "../store/action-creators/updateInput";
import { selectStopAction } from "../store/action-creators/selectStopAction";

const StopsLoader: React.FC = () => {
  const stopsList = _stopsList as StopType[];
  const dispatch = useDispatch();
  const { searchInputValue, favoriteStops, selectedStop } = useTypedSelector((state) => state.arrivals);
  // const [searchInputValue, setSearchInputValue] = useState("");
  // const [selectedStop, setSelectedStop] = useState<StopType>({ id: "", name: "" });
  const [isLoading, setIsloading] = useState(false);
  const [arrivals, setArrivals] = useState<NormalizedArrivalType>([]);
  const [filteredArrivals, setFilteredArrivals] = useState<NormalizedArrivalType | null>(null);
  const [filteredPeriod, setFilteredPeriod] = useState("10");

  // const [favoriteStops, setFavoriteStops] = useState<StopType[]>(
  //   Array.isArray(JSON.parse(localStorage.getItem("favStops")!))
  //     ? JSON.parse(localStorage.getItem("favStops")!)
  //     : []
  // );
  const [isStopInFav, setIsStopInFav] = useState<boolean>(false);
  const [beIn, setBeIn] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({ type: "", routeNumber: "", destination: "" });
  const [parametrsToFilterArrival, setParametrsToFilterArrival] = useState<string[][]>([[], [], []]);

  const stopsToRender = stopsList
    .filter((stop) => {
      return stop.name.toLowerCase().includes(searchInputValue.toLowerCase());
    })
    .slice(0, 100);

  const updateSearchInput = (value: string): void => {
    // setSearchInputValue(value);
    dispatch(updateInput(value));
    // if (selectedStop.id) {
    //   setArrivals([]);
    //   setSelectedStop({ id: "", name: "" });
    // }
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
    setFilters({ type: "", routeNumber: "", destination: "" });
    setFilteredPeriod("10");
    setFilteredArrivals(null);

    // for (let i = 0; i < JSON.parse(localStorage.getItem("favStops")!).length; i++) {
    //   if (JSON.parse(localStorage.getItem("favStops")!)[i].id === selectedStop.id) {
    //     setIsStopInFav(true);
    //     setStopIndexInfav(i);
    //   }
    // }
    // setIsStopInFav(false);
    // };
  }, [selectedStop]);

  useEffect(() => {
    const checkIsStopInFav = (): void => {
      if (favoriteStops.length !== JSON.parse(localStorage.getItem("favStops")!).length) {
        // setFavoriteStops(JSON.parse(localStorage.getItem("favStops")!));
      }
      // if (favoriteStops.find((stop) => stop.id === selectedStop.id)) {
      //   setIsStopInFav(true);
      // } else {
      //   setIsStopInFav(false);
      // }
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
    // if (selectedStop.id) {
    //   const arrivalsLoad = async () => {
    //     setIsloading(true);
    //     let response = await fetch(
    //       `https://v6.bvg.transport.rest/stops/${selectedStop.id}/arrivals?duration=${filteredPeriod}`
    //     );
    //     let data = await response.json();
    //     normalizeArrivals(data.arrivals);
    //   };
    //   arrivalsLoad();
    // }
    // const normalizeArrivals = (arrivalsData: ArivalsType) => {
    //   if (selectedStop.id) {
    //     const normalizedArrivals: NormalizedArrivalType = [];
    //     let arrivalType: string;
    //     arrivalsData.forEach((arrival) => {
    //       switch (arrival.line.product) {
    //         case "suburban":
    //           arrivalType = "S-Bahn";
    //           break;
    //         case "subway":
    //           arrivalType = "U-Bahn";
    //           break;
    //         case "bus":
    //           arrivalType = "Bus";
    //           break;
    //         case "tram":
    //           arrivalType = "Tram";
    //           break;
    //         case "express":
    //         case "regional":
    //           arrivalType = "Regional";
    //           break;
    //       }
    //       normalizedArrivals.push({
    //         type: arrivalType,
    //         time: arrival.when || arrival.plannedWhen,
    //         routeNumber: arrival.line.name,
    //         destination: arrival.provenance,
    //       });
    //     });
    //     setArrivals(normalizedArrivals);
    //     setIsloading(false);
    //   }
    // };
  }, [selectedStop, filteredPeriod]);

  useEffect(() => {
    if (arrivals.length) {
      setBeIn([]);
      (filteredArrivals || arrivals).forEach((arrival) => {
        setBeIn((prev) => [...prev, minutesToArrival(arrival.time)]);
      });

      const interval: NodeJS.Timer = setInterval(() => {
        setBeIn([]);
        (filteredArrivals || arrivals).forEach((arrival) => {
          setBeIn((prev) => [...prev, minutesToArrival(arrival.time)]);
        });
      }, 10000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setParametrsToFilterArrival([]);
      const generateParametrsToFilterArrival = (filterBy: string) => {
        return (filteredArrivals || arrivals).reduce((parametersAccum, currentArrival) => {
          if (!parametersAccum.includes(currentArrival[filterBy as keyof typeof currentArrival])) {
            return [...parametersAccum, currentArrival[filterBy as keyof typeof currentArrival]];
          } else return parametersAccum;
        }, [] as string[]);
      };

      ["type", "routeNumber", "destination"].forEach((filterBy) => {
        setParametrsToFilterArrival((prev) => {
          return [...prev, generateParametrsToFilterArrival(filterBy)];
        });
      });
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
    setFilteredPeriod(period);
  };

  const changeArrivalsFilter = (filterType: string, filterBy: string): void => {
    setFilters({ ...filters, [filterType]: filterBy });
  };

  const resetAllArrivalsFilters = () => {
    setFilters({ type: "", routeNumber: "", destination: "" });
    setFilteredPeriod("10");
    setFilteredArrivals(null);
  };

  const addToFav = (): void => {
    const tempFavStops: StopType[] = Object.assign(favoriteStops);
    if (isStopInFav) {
      console.log("stop in fav, so remoovimg");
      console.log(
        "making state like this:",
        tempFavStops.filter((favStop) => favStop.id !== selectedStop.id)
      );

      // setFavoriteStops(tempFavStops.filter((favStop) => favStop.id !== selectedStop.id));
    } else {
      console.log("stop is not in fav, so pushing");
      console.log("making adding to state:", selectedStop);
      // setFavoriteStops(() => [...favoriteStops, selectedStop]);
    }
  };

  const removeAllFavoritesStops = (): void => {
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
          favoriteStops={favoriteStops}
          removeAllFavoritesStops={removeAllFavoritesStops}
          searchInputValue={searchInputValue}
          selectStop={selectStop}
          isLoading={isLoading}
        />
      )}

      {selectedStop.id && (
        <ArrivalsPage
          selectedStopName={selectedStop.name}
          arrivals={filteredArrivals || arrivals}
          beIn={beIn}
          parametrsToFilterArrival={parametrsToFilterArrival}
          changeArrivalsFilter={changeArrivalsFilter}
          filters={filters}
          changePeriod={changePeriod}
          filteredPeriod={filteredPeriod}
          resetAllArrivalsFilters={resetAllArrivalsFilters}
          isLoading={isLoading}
        />
      )}
      {selectedStop.id && <AddToFavorites addToFav={addToFav} isStopInFav={isStopInFav} />}
    </main>
  );
};

export default StopsLoader;
