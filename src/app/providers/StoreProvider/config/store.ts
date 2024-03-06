import { configureStore } from "@reduxjs/toolkit";
import { type StateSchema } from "./StateSchema";
import { stopsReducer } from "entities/Stops";

export function createReduxStore(initalState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: { stops: stopsReducer },
    // devTools: __IS_DEV__,
    preloadedState: initalState,
  });
}

// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
