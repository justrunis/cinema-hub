import { QueryClient } from "@tanstack/react-query";
import { API_URL, SERVER_URL } from "../utils/constants";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_API_READ_ACCESS_TOKEN = import.meta.env.VITE_API_HOST;

export const queryClient = new QueryClient();

const defaultHeaders = {
  accept: "application/json",
  Authorization: `Bearer ${VITE_API_READ_ACCESS_TOKEN}`,
};

async function makeTMDBApiRequest(
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
  return makeTMDBApiRequest(endpoint, { signal, params });
}

export async function fetchNowPlayingMovies({ currentPage, signal, query }) {
  const endpoint = query ? "/search/movie" : "/movie/now_playing";
  const params = { page: currentPage, query };
  return makeTMDBApiRequest(endpoint, { signal, params });
}

export async function fetchTopRatedMovies({ currentPage, signal, query }) {
  const endpoint = query ? "/search/movie" : "/movie/top_rated";
  const params = { page: currentPage, query };
  return makeTMDBApiRequest(endpoint, { signal, params });
}

export async function fetchUpcomingMovies({ currentPage, signal, query }) {
  const endpoint = query ? "/search/movie" : "/movie/upcoming";
  const params = { page: currentPage, query };
  return makeTMDBApiRequest(endpoint, { signal, params });
}

export async function fetchMovieDetails({ id, signal }) {
  return makeTMDBApiRequest(`/movie/${id}`, { signal });
}

export async function fetchMovieVideos({ id, signal }) {
  return makeTMDBApiRequest(`/movie/${id}/videos`, { signal });
}

export async function fetchMovieReviews({ id, signal, currentPage }) {
  const params = { page: currentPage };
  return makeTMDBApiRequest(`/movie/${id}/reviews`, { signal, params });
}

export async function fetchMovieCredits({ id, signal }) {
  return makeTMDBApiRequest(`/movie/${id}/credits`, { signal });
}

// Fetch Shows
export async function fetchTrendingShows({ currentPage, signal, query }) {
  const endpoint = query ? "/search/tv" : "/trending/tv/day";
  const params = { page: currentPage, query };
  return makeTMDBApiRequest(endpoint, { signal, params });
}

export async function fetchTopRatedShows({ currentPage, signal, query }) {
  const endpoint = query ? "/search/tv" : "/tv/top_rated";
  const params = { page: currentPage, query };
  return makeTMDBApiRequest(endpoint, { signal, params });
}

export async function fetchOnTheAirShows({ currentPage, signal, query }) {
  const endpoint = query ? "/search/tv" : "/tv/on_the_air";
  const params = { page: currentPage, query };
  return makeTMDBApiRequest(endpoint, { signal, params });
}

export async function fetchAiringTodayShows({ currentPage, signal, query }) {
  const endpoint = query ? "/search/tv" : "/tv/airing_today";
  const params = { page: currentPage, query };
  return makeTMDBApiRequest(endpoint, { signal, params });
}

export async function fetchShowDetails({ id, signal }) {
  return makeTMDBApiRequest(`/tv/${id}`, { signal });
}

export async function fetchShowVideos({ id, signal }) {
  return makeTMDBApiRequest(`/tv/${id}/videos`, { signal });
}

export async function fetchShowReviews({ id, signal, currentPage }) {
  const params = { page: currentPage };
  return makeTMDBApiRequest(`/tv/${id}/reviews`, { signal, params });
}

export async function fetchShowSeasonDetails({ id, season, signal }) {
  return makeTMDBApiRequest(`/tv/${id}/season/${season}`, { signal });
}

export async function fetchShowEpisodeDetails({ id, season, episode, signal }) {
  return makeTMDBApiRequest(`/tv/${id}/season/${season}/episode/${episode}`, {
    signal,
  });
}

// Users

/**
 * Get the current user
 * @returns {Promise} object containing the response data
 */
export async function fetchUser() {
  const response = await fetch(SERVER_URL + "/users/user", {
    headers: {
      accept: "application/json",
    },
  });
  return response.json();
}

/**
 * Create a new user
 * @param {*} formData formData object containing username, email, password, and passwordRepeat
 * @returns { Object } object containing the response data and status
 */
export async function createUser({ formData }) {
  const { username, email, password, passwordRepeat } = formData;
  const response = await fetch(SERVER_URL + "/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password, passwordRepeat }),
  });
  const data = await response.json();
  return { data, status: response.status };
}

/**
 * Login a user
 * @param {*} formData formData object containing username and password
 * @returns { Object } object containing the response data and status
 */
export async function loginUser({ formData }) {
  const { username, password } = formData;
  const response = await fetch(SERVER_URL + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  return { data, status: response.status };
}

/**
 * Get all users
 * @returns {Promise} object containing all users
 */
export async function fetchUsers() {
  const response = await fetch(SERVER_URL + "/admin/users", {
    headers: {
      accept: "application/json",
    },
  });
  return response.json();
}

/**
 * Update a user
 * @param {*} userId User ID
 * @param {*} username Users Username
 * @param {*} email UsersEmail
 * @param {*} role Users Role
 *
 * @returns
 */
export async function updateUser({ userId, username, email, role }) {
  const response = await fetch(SERVER_URL + `/admin/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, role }),
  });
  const data = await response.json();
  return { data, status: response.status };
}

/**
 * Delete a user
 * @param {*} userId User ID
 * @returns {Promise} object containing the response data and status
 */
export async function deleteUser({ userId }) {
  const response = await fetch(SERVER_URL + `/admin/users/${userId}`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
    },
  });
  const data = await response.json();
  return { data, status: response.status };
}
