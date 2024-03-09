import { type Arrivals } from "../../model/types/ArrivalsSchema";
import { type ArivalsRawData } from "../../model/services/fetchArrivals";

const transportTypeMap = {
  suburban: "S-Bahn",
  subway: "U-Bahn",
  bus: "Bus",
  tram: "Tram",
  express: "Regional",
  regional: "Regional",
} as const;

type TransportTypeMap = typeof transportTypeMap;
export type TransportTypeKey = keyof TransportTypeMap;
export type TransportType = TransportTypeMap[TransportTypeKey];

export const normalizeArrivals = (arrivalsData: ArivalsRawData): Arrivals => {
  const normalizedArrivals: Arrivals = [];

  arrivalsData.arrivals.forEach((arrival) => {
    const {
      when,
      plannedWhen,
      provenance,
      line: { name, product },
    } = arrival;
    const arrivalType: TransportType = transportTypeMap[product];

    normalizedArrivals.push({
      type: arrivalType,
      time: when ?? plannedWhen,
      routeNumber: name,
      destination: provenance,
    });
  });

  return normalizedArrivals;
};
