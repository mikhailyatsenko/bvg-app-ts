import React, { useState, useEffect } from "react";
import ListOfStopsOnPage from "../components/ListOfStopsOnPage";
import ArrivalsPage from "../components/ArrivalsPage";
import SearchStop from "../components/SearchStop";
import ChangeFilters from "../components/ChangeFilters";
import AddToFavorites from "../components/AddToFavorites";
import _stopsList from "../stopsList.json";
import { StopType, ArivalsType, NormalizedArrivalType } from "../types";

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
    console.log("selected id", id);
    setSelectedStop({ id: id, name: name });
  };

  useEffect(() => {
    if (selectedStop.id) {
      const arrivalsLoad = async () => {
        setIsloading(true);
        console.log(isLoading);

        console.log(selectedStop);
        let response = await fetch(`https://v6.bvg.transport.rest/stops/${selectedStop.id}/arrivals?duration=${filteredPeriod}`);
        let data = await response.json();
        normalizeArrivals(data.arrivals);
      };

      const normalizeArrivals = (arrivalsData: ArivalsType) => {
        if (selectedStop.id) {
          console.log(arrivalsData);
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

      arrivalsLoad();
    }
  }, [selectedStop, filteredPeriod]);

  const changeTransport = (transport: string): void => {
    console.log(transport);
    if (transport === "all") {
      setFilteredArrivals(null);
    } else {
      setFilteredArrivals({ [selectedStop.name]: arrivals[selectedStop.name].filter((arrival) => arrival.type === transport) });
    }
  };

  const changePeriod = (period: string): void => {
    setFilteredPeriod(period);
    console.log(filteredPeriod);
  };

  const checkIsStopInFav = (): void => {
    console.log("cheking");
    for (let i = 0; i < favoriteStops.length; i++) {
      if (favoriteStops[i].id === selectedStop.id) {
        setIsStopInFav(true);
        setStopIndexInfav(i);
      }
    }
  };

  const addToFav = (): void => {
    const tempFavStops = Object.assign(favoriteStops);
    if (isStopInFav) {
      tempFavStops.splice(stopIndexInfav, 1);
      setFavoriteStops(tempFavStops);
      setIsStopInFav(false);
      setStopIndexInfav(null);
      localStorage.setItem("favStops", JSON.stringify(favoriteStops));
      console.log("deleted", selectedStop);
    } else {
      tempFavStops.push(selectedStop);
      setFavoriteStops(tempFavStops);
      setIsStopInFav(true);
      localStorage.setItem("favStops", JSON.stringify(favoriteStops));
      console.log("added", selectedStop);
    }
  };

  const removeAllFavoritesStops = (): void => {
    setFavoriteStops([]);
    localStorage.setItem("favStops", "[]");
  };
  return (
    <main>
      <SearchStop updateSearchInput={updateSearchInput} searchInputValue={searchInputValue} selectedStop={selectedStop} />
      {arrivals[Object.keys(arrivals)[0]] && <ChangeFilters changeTransport={changeTransport} changePeriod={changePeriod} />}
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
          <ArrivalsPage arrivals={filteredArrivals || arrivals} />
          <AddToFavorites addToFav={addToFav} checkIsStopInFav={checkIsStopInFav} isStopInFav={isStopInFav} />
        </>
      )}
    </main>
  );
};

export default StopsLoader;
