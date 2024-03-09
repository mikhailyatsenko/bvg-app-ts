import { type StopsSchema } from "entities/Stops";
import { type StopSearchSchema } from "features/StopSearch/model/types/StopSearchSchema";
import { type ArrivalsSchema } from "features/LoadArrivals/model/types/ArrivalsSchema";

export interface StateSchema {
  stops: StopsSchema;
  search: StopSearchSchema;
  arrivals: ArrivalsSchema;
}
