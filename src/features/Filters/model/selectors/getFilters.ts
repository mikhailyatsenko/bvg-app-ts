import { type StateSchema } from "app/providers/StoreProvider";

export const getArrivalsFilters = (state: StateSchema) => state?.filters?.arrivalsFilters;
