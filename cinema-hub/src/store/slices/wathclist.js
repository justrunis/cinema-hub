import { createSlice } from "@reduxjs/toolkit";

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
    {
      id: 614,
      name: "Futurama",
      original_name: "Futurama",
      poster_path: "/sdJcX2cXirwQurLLlrDLYov7hcD.jpg.jpg",
      vote_average: 8.4,
    },
  ],
};

const watchlistSlice = createSlice({
  name: "watchlist",
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
  },
});

export const watchlistActions = watchlistSlice.actions;

export default watchlistSlice.reducer;
