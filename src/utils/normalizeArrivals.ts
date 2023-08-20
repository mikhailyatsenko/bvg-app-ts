import { NormalizedArrivalType, ArivalsType } from "../types/MainTypes";

export const normalizeArrivals = (arrivalsData: ArivalsType) => {
  const normalizedArrivals: NormalizedArrivalType = [];

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

    normalizedArrivals.push({
      type: arrivalType,
      time: arrival.when || arrival.plannedWhen,
      routeNumber: arrival.line.name,
      destination: arrival.provenance,
    });
  });

  return normalizedArrivals;
};
