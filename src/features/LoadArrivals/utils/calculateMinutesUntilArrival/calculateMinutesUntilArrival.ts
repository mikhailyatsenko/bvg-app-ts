import { type Arrivals } from "features/LoadArrivals";

function minutesUntilArrival(arrivalTime: string): number {
  const now: Date = new Date();
  const arrival: Date = new Date(arrivalTime);
  const differenceMs: number = arrival.getTime() - now.getTime();
  const minutes: number = Math.floor(differenceMs / (1000 * 60));
  return minutes;
}

export const calculateMinutesUntilArrival = (arrivals: Arrivals) => {
  return arrivals.map((arrival) => minutesUntilArrival(arrival.time));
};
