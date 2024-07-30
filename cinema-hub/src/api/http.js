import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { API_URL } from "../utils/constants";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_API_READ_ACCESS_TOKEN = import.meta.env.VITE_API_HOST;

export const queryClient = new QueryClient();

export async function fetchTrendingMovies({ currentPage, signal, query }) {
  const options = {
    method: "GET",
    signal,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_API_READ_ACCESS_TOKEN}`,
    },
  };

  if (query) {
    const response = await fetch(
      `${API_URL}/search/movie?query=${query}&language=en-US&api_key=${VITE_API_KEY}&page=${currentPage}`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies by query");
    }

    return response.json();
  }

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

export async function fetchTrendingShows({ currentPage, signal, query }) {
  const options = {
    method: "GET",
    signal,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_API_READ_ACCESS_TOKEN}`,
    },
  };

  if (query) {
    const response = await fetch(
      `${API_URL}/search/tv?query=${query}&language=en-US&api_key=${VITE_API_KEY}&page=${currentPage}`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch shows by query");
    }

    return response.json();
  }

  const response = await fetch(
    `${API_URL}/trending/tv/day?language=en-US&api_key=${VITE_API_KEY}&page=${currentPage}&query=${query}`,
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending shows");
  }

  return response.json();
}

export async function fetchShowDetails({ id, signal }) {
  const options = {
    method: "GET",
    signal,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_API_READ_ACCESS_TOKEN}`,
    },
  };

  const response = await fetch(
    `${API_URL}/tv/${id}?language=en-US&api_key=${VITE_API_KEY}`,
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch show details");
  }

  return response.json();
}
