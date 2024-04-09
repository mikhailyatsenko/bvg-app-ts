import { configureStore } from "@reduxjs/toolkit";
import { type StateSchema } from "./StateSchema";
import { stopSearchReducer } from "features/StopSearch";
import { arrivalsReducer } from "features/LoadArrivals";
import { filtersReducer } from "features/Filters/model/slice/filterSlice";
import { addToFavoritesReducer } from "features/AddToFavorites/model/slice/addToFavoritesSlice";

export function createReduxStore(initalState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      search: stopSearchReducer,
      arrivals: arrivalsReducer,
      filters: filtersReducer,
      favorites: addToFavoritesReducer,
    },
    // devTools: __IS_DEV__,
    preloadedState: initalState,
  });
}

// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
