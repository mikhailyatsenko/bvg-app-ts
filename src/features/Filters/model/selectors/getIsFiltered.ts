import { type StateSchema } from "app/providers/StoreProvider";

export const getIsFiltered = (state: StateSchema) => state?.filters?.isFiltered;
