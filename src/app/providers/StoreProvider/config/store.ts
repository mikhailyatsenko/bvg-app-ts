import { configureStore } from "@reduxjs/toolkit";
import { type StateSchema } from "./StateSchema";
import { stopsReducer } from "entities/Stops";
import { stopSearchReducer } from "features/StopSearch";
import { arrivalsReducer } from "features/LoadArrivals/model/slice/arrivalsSlice";
import { filtersReducer } from "features/Filters/model/slice/filterSlice";

export function createReduxStore(initalState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      stops: stopsReducer,
      search: stopSearchReducer,
      arrivals: arrivalsReducer,
      filters: filtersReducer,
    },
    // devTools: __IS_DEV__,
    preloadedState: initalState,
  });
}

// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
