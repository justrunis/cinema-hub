import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { API_URL } from "../utils/constants";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_API_READ_ACCESS_TOKEN = import.meta.env.VITE_API_HOST;

export const queryClient = new QueryClient();

export async function fetchTrendingMovies({ currentPage, signal, query }) {
  console.log("fetchTrendingMovies");
  const options = {
    method: "GET",
    signal,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_API_READ_ACCESS_TOKEN}`,
    },
  };

  if (query) {
    console.log("fetchTrendingMovies query: ", query);
    const response = await fetch(
      `${API_URL}/search/movie?query=${query}&language=en-US&api_key=${VITE_API_KEY}&page=${currentPage}`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies by query");
    }

    return response.json();
  }

  console.log(
    "URL: ",
    `${API_URL}/trending/all/day?language=en-US&api_key=${VITE_API_KEY}&page=${currentPage}&query=${query}`
  );

  const response = await fetch(
    `${API_URL}/trending/all/day?language=en-US&api_key=${VITE_API_KEY}&page=${currentPage}&query=${query}`,
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  return response.json();
}

export async function fetchMovieDetails({ id, signal }) {
  console.log("fetchMovieDetails");
  const options = {
    method: "GET",
    signal,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_API_READ_ACCESS_TOKEN}`,
    },
  };

  const response = await fetch(
    `${API_URL}/movie/${id}?language=en-US&api_key=${VITE_API_KEY}`,
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
}
