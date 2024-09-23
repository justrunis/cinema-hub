import { createSlice } from "@reduxjs/toolkit";
import { addToFavorites, removeFavorite } from "../../api/http";

const initialState = {
  favorites: [],
};

const token = localStorage.getItem("cinema-hub-token");

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    async addFavorite(state, action) {
      await addToFavorites({
        token: action.payload.token,
        itemId: action.payload.itemId,
        itemType: action.payload.itemType,
        title:
          action.payload.title ||
          action.payload.name ||
          action.payload.original_name,
        poster_path: action.payload.poster_path,
        vote_average: action.payload.vote_average,
      });
      state.favorites.push(action.payload);
    },
    async removeFavorite(state, action) {
      await removeFavorite({
        token: action.payload.token,
        itemId: action.payload.id,
      });
      state.favorites = state.favorites.filter(
        (item) => item.itemId !== action.payload
      );
    },
  },
});

export const favoritesActions = favoritesSlice.actions;

export default favoritesSlice.reducer;
