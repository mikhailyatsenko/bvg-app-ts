import { type StateSchema } from "app/providers/StoreProvider";

export const getArrivals = (state: StateSchema) => state?.arrivals?.arrivals;
