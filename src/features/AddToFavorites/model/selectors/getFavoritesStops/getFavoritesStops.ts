import { type StateSchema } from "app/providers/StoreProvider";

export const getFavoritesStops = (state: StateSchema) => state?.favorites?.favoriteStops;
