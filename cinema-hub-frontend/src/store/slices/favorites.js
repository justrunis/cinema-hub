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
    addFavorite(state, action) {
      addToFavorites({
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
    removeFavorite(state, action) {
      removeFavorite({
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
