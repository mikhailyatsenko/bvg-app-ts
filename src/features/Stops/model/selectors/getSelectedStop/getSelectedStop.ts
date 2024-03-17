import { type StateSchema } from "app/providers/StoreProvider";

export const getSelectedStop = (state: StateSchema) => state?.stops?.selectedStop;
