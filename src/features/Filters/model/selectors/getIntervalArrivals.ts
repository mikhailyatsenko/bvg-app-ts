import { type StateSchema } from "app/providers/StoreProvider";

export const getIntervalArrivals = (state: StateSchema) => state?.filters?.intervalArrivals;
