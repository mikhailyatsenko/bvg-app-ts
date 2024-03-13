import { type StateSchema } from "app/providers/StoreProvider";

export const getFilteredArrivals = (state: StateSchema) => state?.filters?.filteredArrivals;
