import React, { useState, useEffect } from "react";
import ListOfStopsOnPage from "../components/ListOfStopsOnPage";
import ArrivalsPage from "../components/ArrivalsPage";
import SearchStop from "../components/SearchStop";
import AddToFavorites from "../components/AddToFavorites";
import _stopsList from "../stopsList.json";
import { StopType, ArivalsType, NormalizedArrivalType, Filters } from "../types";

const StopsLoader: React.FC = () => {
  const stopsList = _stopsList as StopType[];
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [selectedStop, setSelectedStop] = useState<StopType>({ id: "", name: "" });
  const [arrivals, setArrivals] = useState<NormalizedArrivalType>({});
  const [filteredArrivals, setFilteredArrivals] = useState<NormalizedArrivalType | null>(null);
  const [filteredPeriod, setFilteredPeriod] = useState("10");
  const [favoriteStops, setFavoriteStops] = useState(JSON.parse(localStorage.getItem("favStops") || "[]"));
  const [isStopInFav, setIsStopInFav] = useState<boolean>(false);
  const [stopIndexInfav, setStopIndexInfav] = useState<number | null>(null);
  const [beIn, setBeIn] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({ type: "", routeNumber: "", destination: "" });
  const [parametrsToFilterArrival, setParametrsToFilterArrival] = useState<string[][]>([[], [], []]);

  const stopsToRender = stopsList
    .filter((stop) => {
      return stop.name.toLowerCase().includes(searchInputValue.toLowerCase());
    })
    .slice(0, 100);

  const updateSearchInput = (value: string): void => {
    setSearchInputValue(value);
    if (selectedStop.id) setArrivals({});
  };

  const selectStop = (id: string, name: string): void => {
    setSearchInputValue("");
    setSelectedStop({ id: id, name: name });
  };

  useEffect(() => {
    setFilters({ type: "", routeNumber: "", destination: "" });
    setFilteredArrivals(null);
    setFilteredPeriod("10");
    const checkIsStopInFav = (): void => {
      for (let i = 0; i < favoriteStops.length; i++) {
        if (favoriteStops[i].id === selectedStop.id) {
          setIsStopInFav(true);
          setStopIndexInfav(i);
          return;
        }
      }
      setIsStopInFav(false);
    };
    checkIsStopInFav();
  }, [selectedStop]);

  useEffect(() => {
    if (selectedStop.id) {
      const arrivalsLoad = async () => {
        setIsloading(true);

        let response = await fetch(`https://v6.bvg.transport.rest/stops/${selectedStop.id}/arrivals?duration=${filteredPeriod}`);
        let data = await response.json();
        normalizeArrivals(data.arrivals);
      };
      arrivalsLoad();
    }
    const normalizeArrivals = (arrivalsData: ArivalsType) => {
      if (selectedStop.id) {
        const normalizedArrivals: NormalizedArrivalType = { [selectedStop.name]: [] };

        let arrivalType: string;
        arrivalsData.forEach((arrival) => {
          switch (arrival.line.product) {
            case "suburban":
              arrivalType = "S-Bahn";
              break;
            case "subway":
              arrivalType = "U-Bahn";
              break;
            case "bus":
              arrivalType = "Bus";
              break;
            case "tram":
              arrivalType = "Tram";
              break;
            case "express":
            case "regional":
              arrivalType = "Regional";
              break;
          }

          normalizedArrivals[selectedStop.name].push({
            type: arrivalType,
            time: arrival.when || arrival.plannedWhen,
            routeNumber: arrival.line.name,
            destination: arrival.provenance,
          });
        });

        setArrivals(normalizedArrivals);

        setIsloading(false);
      }
    };
  }, [selectedStop, filteredPeriod]);

  useEffect(() => {
    if (arrivals[selectedStop.name]) {
      setBeIn([]);
      console.log(filteredArrivals || arrivals);
      (filteredArrivals || arrivals)[selectedStop.name].forEach((arrival) => {
        setBeIn((prev) => [...prev, minutesToArrival(arrival.time)]);
      });

      const interval: NodeJS.Timer = setInterval(() => {
        setBeIn([]);
        (filteredArrivals || arrivals)[selectedStop.name].forEach((arrival) => {
          setBeIn((prev) => [...prev, minutesToArrival(arrival.time)]);
        });
      }, 10000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivals, filteredArrivals]);

  useEffect(() => {
    console.log("arrivals[selectedStop.name]", arrivals[selectedStop.name]);
    if (arrivals[selectedStop.name]) {
      if (!filters.type && !filters.routeNumber && !filters.destination) {
        setFilteredArrivals(null);
      } else {
        setFilteredArrivals({
          [selectedStop.name]: arrivals[selectedStop.name]
            .filter((arrival) => arrival.type === (filters.type || arrival.type))
            .filter((arrival) => arrival.routeNumber === (filters.routeNumber || arrival.routeNumber))
            .filter((arrival) => arrival.destination === (filters.destination || arrival.destination)),
        });
      }
    }
  }, [filters, arrivals]);

  useEffect(() => {
    if (arrivals[selectedStop.name]) {
      setParametrsToFilterArrival([]);
      console.log("in useeffrc");
      const generateParametrsToFilterArrival = (filterBy: string) => {
        return (filteredArrivals || arrivals)[selectedStop.name].reduce((parametersAccum, currentArrival) => {
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

  const addToFav = (): void => {
    const tempFavStops = Object.assign(favoriteStops);
    if (isStopInFav) {
      tempFavStops.splice(stopIndexInfav, 1);
      setFavoriteStops(tempFavStops);
      setIsStopInFav(false);
      setStopIndexInfav(null);
      localStorage.setItem("favStops", JSON.stringify(favoriteStops));
    } else {
      tempFavStops.push(selectedStop);
      setFavoriteStops(tempFavStops);
      setIsStopInFav(true);
      localStorage.setItem("favStops", JSON.stringify(favoriteStops));
    }
  };

  const removeAllFavoritesStops = (): void => {
    setFavoriteStops([]);
    localStorage.setItem("favStops", "[]");
  };
  return (
    <main>
      <SearchStop updateSearchInput={updateSearchInput} searchInputValue={searchInputValue} selectedStop={selectedStop} />
      {isLoading ? (
        <div className="lds-dual-ring"></div>
      ) : !arrivals[Object.keys(arrivals)[0]] ? (
        <ListOfStopsOnPage
          stopsToRender={stopsToRender}
          favoriteStops={favoriteStops}
          removeAllFavoritesStops={removeAllFavoritesStops}
          searchInputValue={searchInputValue}
          selectStop={selectStop}
        />
      ) : (
        <>
          <ArrivalsPage
            arrivals={filteredArrivals || arrivals}
            beIn={beIn}
            parametrsToFilterArrival={parametrsToFilterArrival}
            changeArrivalsFilter={changeArrivalsFilter}
            filters={filters}
            changePeriod={changePeriod}
            filteredPeriod={filteredPeriod}
          />
          <AddToFavorites addToFav={addToFav} isStopInFav={isStopInFav} />
        </>
      )}
    </main>
  );
};

export default StopsLoader;
