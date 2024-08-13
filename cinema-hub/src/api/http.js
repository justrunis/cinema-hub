import { QueryClient } from "@tanstack/react-query";
import { API_URL } from "../utils/constants";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_API_READ_ACCESS_TOKEN = import.meta.env.VITE_API_HOST;

export const queryClient = new QueryClient();

const defaultHeaders = {
  accept: "application/json",
  Authorization: `Bearer ${VITE_API_READ_ACCESS_TOKEN}`,
};

async function makeApiRequest(
  endpoint,
  { signal, params = {}, method = "GET", body = null }
) {
  const url = new URL(`${API_URL}${endpoint}`);

  // Only append params to URL for GET requests
  if (method === "GET") {
    url.search = new URLSearchParams({
      language: "en-US",
      api_key: VITE_API_KEY,
      ...params,
    });
  }

  const options = {
    method,
    signal,
    headers: defaultHeaders,
  };

  // Include body if method is POST, PUT, etc.
  if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch from endpoint: ${endpoint}`);
  }

  return response.json();
}

// Fetch Movies
export async function fetchTrendingMovies({ currentPage, signal, query }) {
  const endpoint = query ? "/search/movie" : "/trending/movie/day";
  const params = { page: currentPage, query };
  return makeApiRequest(endpoint, { signal, params });
}

export async function fetchMovieDetails({ id, signal }) {
  return makeApiRequest(`/movie/${id}`, { signal });
}

export async function fetchMovieVideos({ id, signal }) {
  return makeApiRequest(`/movie/${id}/videos`, { signal });
}

export async function fetchMovieReviews({ id, signal, currentPage }) {
  const params = { page: currentPage };
  return makeApiRequest(`/movie/${id}/reviews`, { signal, params });
}

export async function fetchMovieCredits({ id, signal }) {
  return makeApiRequest(`/movie/${id}/credits`, { signal });
}

// Fetch Shows
export async function fetchTrendingShows({ currentPage, signal, query }) {
  const endpoint = query ? "/search/tv" : "/trending/tv/day";
  const params = { page: currentPage, query };
  return makeApiRequest(endpoint, { signal, params });
}

export async function fetchShowDetails({ id, signal }) {
  return makeApiRequest(`/tv/${id}`, { signal });
}

export async function fetchShowVideos({ id, signal }) {
  return makeApiRequest(`/tv/${id}/videos`, { signal });
}

export async function fetchShowReviews({ id, signal, currentPage }) {
  const params = { page: currentPage };
  return makeApiRequest(`/tv/${id}/reviews`, { signal, params });
}

export async function fetchShowSeasonDetails({ id, season, signal }) {
  return makeApiRequest(`/tv/${id}/season/${season}`, { signal });
}

export async function fetchShowEpisodeDetails({ id, season, episode, signal }) {
  return makeApiRequest(`/tv/${id}/season/${season}/episode/${episode}`, {
    signal,
  });
}
