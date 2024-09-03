import { createSlice } from "@reduxjs/toolkit";
import { addToFavorites, removeFavorite } from "../../api/http";

const initialState = {
  shows: [
    {
      id: 615,
      name: "Futurama",
      original_name: "Futurama",
      poster_path: "/sdJcX2cXirwQurLLlrDLYov7hcD.jpg.jpg",
      vote_average: 8.4,
    },
  ],
  favorites: [],
};

const token = localStorage.getItem("token");

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addShow(state, action) {
      state.shows.push(action.payload);
    },
    removeShow(state, action) {
      state.shows = state.shows.filter((show) => show.id !== action.payload.id);
    },
    getShowById(state, action) {
      return state.shows.find((show) => show.id === action.payload.id);
    },
    addFavorite(state, action) {
      console.log(action.payload);
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
