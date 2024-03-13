import { type StopsSchema } from "entities/Stops";
import { type StopSearchSchema } from "features/StopSearch/model/types/StopSearchSchema";
import { type ArrivalsSchema } from "features/LoadArrivals/model/types/ArrivalsSchema";
import { type FilterArrivalsSchema } from "features/FilterArrivals";

export interface StateSchema {
  stops: StopsSchema;
  search: StopSearchSchema;
  arrivals: ArrivalsSchema;
  filters: FilterArrivalsSchema;
}
