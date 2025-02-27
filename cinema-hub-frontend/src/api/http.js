import { QueryClient } from "@tanstack/react-query";
import { API_URL } from "../utils/constants";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_API_READ_ACCESS_TOKEN = import.meta.env.VITE_API_READ_ACCESS_TOKEN;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

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

export async function fetchSimilarMovies({ id, signal }) {
  return makeTMDBApiRequest(`/movie/${id}/similar`, { signal });
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

export async function fetchSimilarShows({ id, signal }) {
  return makeTMDBApiRequest(`/tv/${id}/similar`, { signal });
}

// Users

/**
 * Get the current user
 * @returns {Promise} object containing the response data
 */
export async function fetchUser({ token }) {
  const response = await fetch(SERVER_URL + "/users/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

/**
 * Create a new user
 * @param {*} formData formData object containing username, email, password, and passwordRepeat
 * @returns { Object } object containing the response data and status
 */
export async function createUser({ formData }) {
  const { username, email, password, passwordRepeat } = formData;
  const response = await fetch(SERVER_URL + "/auth/register", {
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
  const response = await fetch(SERVER_URL + "/auth/login", {
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
 * Forgot password
 * @param {*} param0 email object
 * @returns { Object } object containing the response data and status
 */
export async function forgotPassword({ email }) {
  const response = await fetch(SERVER_URL + "/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  return { data, status: response.status };
}

export async function resetPassword({ password, passwordRepeat, token }) {
  const response = await fetch(SERVER_URL + "/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, passwordRepeat, token }),
  });
  const data = await response.json();
  return { data, status: response.status };
}

// FAVORITES

export async function fetchUsersFavorites({ token }) {
  const response = await fetch(SERVER_URL + "/favorites", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function addToFavorites({
  token,
  itemId,
  itemType,
  title,
  poster_path,
  vote_average,
}) {
  if (!token) {
    throw new Error("Authorization token is missing!");
  }

  const response = await fetch(SERVER_URL + "/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      itemId,
      itemType,
      title,
      poster_path,
      vote_average,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const res = await response.json();
  return res;
}

export async function removeFavorite({ token, itemId }) {
  if (!token) {
    throw new Error("Authorization token is missing!");
  }

  const response = await fetch(SERVER_URL + `/favorites/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const res = await response.json();
  return res;
}

// WATCHLIST

export async function fetchUsersWatchlist({ token }) {
  const response = await fetch(SERVER_URL + "/watchlist", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function addToWatchlist({
  token,
  itemId,
  itemType,
  title,
  poster_path,
  vote_average,
}) {
  if (!token) {
    throw new Error("Authorization token is missing!");
  }

  const response = await fetch(SERVER_URL + "/watchlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      itemId,
      itemType,
      title,
      poster_path,
      vote_average,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const res = await response.json();
  return res;
}

export async function removeFromWatchlist({ token, itemId }) {
  if (!token) {
    throw new Error("Authorization token is missing!");
  }

  const response = await fetch(SERVER_URL + `/watchlist/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const res = await response.json();
  return res;
}

export async function isItemFavorite({ token, itemId }) {
  if (!token) {
    throw new Error("Authorization token is missing!");
  }

  const response = await fetch(SERVER_URL + `/favorites/isFavorite/${itemId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function isItemInWatchlist({ token, itemId }) {
  if (!token) {
    throw new Error("Authorization token is missing!");
  }

  const response = await fetch(
    SERVER_URL + `/watchlist/isInWatchlist/${itemId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function changeBio({ token, bio }) {
  const response = await fetch(SERVER_URL + "/users/bio", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bio }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

// FRIENDS

export async function fetchUserSuggestedFriends({ token }) {
  const response = await fetch(SERVER_URL + "/friends/suggested", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function fetchUsersFriendsList({ token }) {
  const response = await fetch(SERVER_URL + "/friends/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function fetchUsersFriendsRequests({ token }) {
  const response = await fetch(SERVER_URL + "/friends/requests", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function addFriend({ token, friendId }) {
  const response = await fetch(SERVER_URL + "/friends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ friendId }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function removeFriend({ token, friendId }) {
  const response = await fetch(SERVER_URL + `/friends/delete/${friendId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function acceptFriendRequest({ token, friendId }) {
  const response = await fetch(SERVER_URL + `/friends/${friendId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function rejectFriendRequest({ token, friendId }) {
  const response = await fetch(SERVER_URL + `/friends/${friendId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function fetchUserFriendsProfileInfo({ token, friendId }) {
  const response = await fetch(SERVER_URL + `/friends/profile/${friendId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

// ADMIN

/**
 * Get all users
 * @param {*} page Page number
 * @param {*} limit Number of users per page
 * @returns {Promise} object containing the users array, nextPage, and previousPage
 */
export async function fetchUsers({ page = 1, limit = 10 }) {
  try {
    const response = await fetch(
      `${SERVER_URL}/admin/users?page=${page}&limit=${limit}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("cinema-hub-token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.results) {
      // Process the data.results and handle pagination links (data.next, data.previous)
      return {
        users: data.results,
        nextPage: data.next ? data.next.page : null,
        previousPage: data.previous ? data.previous.page : null,
        totalPages: data.totalPages,
      };
    } else {
      return { users: [], nextPage: null, previousPage: null, totalPages: 0 };
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], nextPage: null, previousPage: null, totalPages: 0 };
  }
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
      Authorization: `Bearer ${localStorage.getItem("cinema-hub-token")}`,
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
      Authorization: `Bearer ${localStorage.getItem("cinema-hub-token")}`,
    },
  });
  const data = await response.json();
  return { data, status: response.status };
}

// TRIVIA

export async function fetchTriviaQuestions({ category, difficulty }) {
  const TRIVIA_URL = "https://opentdb.com/api.php?amount=10";
  const response = await fetch(
    `${TRIVIA_URL}&category=${category}&difficulty=${difficulty}&type=multiple`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

export async function addUserTriviaAnswers({
  category,
  difficulty,
  correctAnswers,
  questions,
}) {
  const response = await fetch(SERVER_URL + "/trivia", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("cinema-hub-token")}`,
    },
    body: JSON.stringify({ category, difficulty, correctAnswers, questions }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function getUsersTriviaAnswers({ page }) {
  const response = await fetch(SERVER_URL + "/trivia?page=" + page, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("cinema-hub-token")}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function fetchTriviaLeaderboard({ page }) {
  const response = await fetch(
    SERVER_URL + "/trivia/leaderboard?page=" + page,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("cinema-hub-token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function fetchTriviaPointsForUser({ id }) {
  const response = await fetch(SERVER_URL + `/trivia/points/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("cinema-hub-token")}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}
