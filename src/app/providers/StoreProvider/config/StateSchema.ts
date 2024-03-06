import { type StopsSchema } from "entities/Stops";
import { type StopSearchSchema } from "features/StopSearch/model/types/StopSearchSchema";

export interface StateSchema {
  stops: StopsSchema;
  search: StopSearchSchema;
}
