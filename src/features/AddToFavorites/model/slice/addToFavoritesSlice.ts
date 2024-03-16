import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Stop } from "entities/Stops";
import { type AddToFavoritesSchema } from "../types/AddToFavoritesSchema";

const initialState: AddToFavoritesSchema = {
  favoriteStops: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Stop>) => {
      state.favoriteStops.push(action.payload);
      localStorage.setItem("favoriteStops", JSON.stringify(state.favoriteStops));
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favoriteStops = state.favoriteStops.filter((stop) => stop.id !== action.payload);
      localStorage.setItem("favoriteStops", JSON.stringify(state.favoriteStops));
    },
    initializeFavorites: (state) => {
      const storedFavorites = localStorage.getItem("favoriteStops");
      if (storedFavorites) {
        state.favoriteStops = JSON.parse(storedFavorites);
      }
    },
  },
});

export const { actions: addToFavoritesActions, reducer: addToFavoritesReducer } = favoritesSlice;
