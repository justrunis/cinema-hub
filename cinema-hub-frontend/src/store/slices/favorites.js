import { createSlice } from "@reduxjs/toolkit";
import { addToFavorites, removeFavorite } from "../../api/http";

const initialState = {
  movies: [
    {
      id: 533535,
      title: "Deadpool & Wolverine",
      original_name: "Deadpool & Wolverine",
      poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
      vote_average: 8.1,
    },
  ],
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
    addMovie(state, action) {
      state.movies.push(action.payload);
    },
    removeMovie(state, action) {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    setFavorites(state, action) {
      state.favorites = action.payload;
    },
    getMovieById(state, action) {
      return state.movies.find((movie) => movie.id === action.payload.id);
    },
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
      addToFavorites({
        token: action.payload.token,
        itemId: action.payload.itemId,
        movieId: action.payload.id,
        itemType: action.payload.itemType,
        title: action.payload.title || action.payload.name,
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
