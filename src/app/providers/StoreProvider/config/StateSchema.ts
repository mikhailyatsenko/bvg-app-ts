import { type StopSearchSchema } from "features/StopSearch";
import { type ArrivalsSchema } from "features/LoadArrivals";
import { type FiltersSchema } from "features/Filters";
import { type AddToFavoritesSchema } from "features/AddToFavorites";

export interface StateSchema {
  search: StopSearchSchema;
  arrivals: ArrivalsSchema;
  filters: FiltersSchema;
  favorites: AddToFavoritesSchema;
}
