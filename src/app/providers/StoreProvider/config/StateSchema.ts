import { type StopsSchema } from "features/Stops";
import { type StopSearchSchema } from "features/StopSearch/model/types/StopSearchSchema";
import { type ArrivalsSchema } from "features/LoadArrivals/model/types/ArrivalsSchema";
import { type FiltersSchema } from "features/Filters";
import { type AddToFavoritesSchema } from "features/AddToFavorites";

export interface StateSchema {
  stops: StopsSchema;
  search: StopSearchSchema;
  arrivals: ArrivalsSchema;
  filters: FiltersSchema;
  favorites: AddToFavoritesSchema;
}
