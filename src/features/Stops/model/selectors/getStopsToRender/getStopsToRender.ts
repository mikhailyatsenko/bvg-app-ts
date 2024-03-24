import { type StateSchema } from "app/providers/StoreProvider";

export const getStopsToRender = (state: StateSchema) => state?.stops?.stopsToRender;
