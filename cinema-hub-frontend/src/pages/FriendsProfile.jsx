import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchUserFriendsProfileInfo,
  fetchTriviaPointsForUser,
} from "../api/http";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import { STALE_TIME } from "../utils/constants";
import MovieCard from "../components/Movies/MovieCard";

export default function FriendsProfile() {
  const friendId = useParams().id;
  const token = localStorage.getItem("cinema-hub-token");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["friendProfile", friendId],
    queryFn: () => fetchUserFriendsProfileInfo({ token, friendId }),
    staleTime: STALE_TIME,
  });

  const {
    data: triviaData,
    isLoading: triviaIsLoading,
    isError: triviaIsError,
    error: triviaError,
  } = useQuery({
    queryKey: ["triviaPoints", friendId],
    queryFn: () => fetchTriviaPointsForUser({ id: friendId }),
    staleTime: STALE_TIME,
  });

  console.log(triviaData);

  const friendInfo = data?.friendInfo;

  const friendFavorites = data?.favorites;

  const friendWatchlist = data?.watchlist;

  if (isLoading || triviaIsLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full p-6">
        <ErrorIndicator title="Failed to fetch friend's profile" />
      </div>
    );
  }

  if (triviaIsError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full p-6">
        <ErrorIndicator title="Failed to fetch friend's trivia points" />
      </div>
    );
  }

  if (data?.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full p-6 bg-base-200">
        <h1 className="text-2xl font-bold">No friends found.</h1>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container flex flex-col items-center gap-4 w-full p-6 bg-base-200 rounded-lg"
    >
      {/* Cover Photo */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-48 bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg mb-4 relative flex items-center justify-center"
      >
        <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
          <motion.img
            src={
              friendInfo?.avatar ||
              "https://static.thenounproject.com/png/363639-200.png"
            }
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-xl text-center flex flex-col items-center"
      >
        <h1 className="text-2xl font-bold">{friendInfo?.username}</h1>
        <p className="text-sm text-gray-500">
          Member since: {new Date(friendInfo?.createdAt).toLocaleDateString()}
        </p>
      </motion.div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-xl mt-4"
      >
        <p className="text-xl font-bold mb-2">Bio</p>
        <p className="text-base font-light text-accent">
          {friendInfo?.bio || "No bio available."}
        </p>
      </motion.div>

      <div className="w-full lg:w-1/2 grid grid-cols-1 gap-4 mt-4 grid-auto-rows-min">
        {/* Favorites */}
        <div className="collapse collapse-arrow bg-base-100 rounded-lg shadow-md mb-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium bg-primary text-white rounded-t-lg">
            Favorites
          </div>
          <div className="collapse-content bg-base-300 rounded-b-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-4"
            >
              <h1 className="text-2xl font-bold mb-4">
                Favorite Movies & Shows
              </h1>
              {friendFavorites?.length <= 0 && (
                <h1 className="text-lg font-light text-accent">
                  No favorites found.
                </h1>
              )}
              <div className="grid grid-cols-3 gap-4">
                {friendFavorites?.map((favorite) => (
                  <MovieCard key={favorite.itemId} movie={favorite} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Watchlist */}
        <div className="collapse collapse-arrow bg-base-100 rounded-lg shadow-md">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium bg-accent text-white rounded-t-lg">
            Watchlist
          </div>
          <div className="collapse-content bg-base-300 rounded-b-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-4"
            >
              <h1 className="text-2xl font-bold mb-4">Watchlist</h1>
              {friendWatchlist?.length <= 0 && (
                <h1 className="text-lg font-light text-accent">
                  No watchlist found.
                </h1>
              )}
              <div className="grid grid-cols-3 gap-4">
                {friendWatchlist?.map((watchlistItem) => (
                  <MovieCard key={watchlistItem.itemId} movie={watchlistItem} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="bg-base-100 rounded-lg shadow-lg p-8 w-full max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-6 text-center">
            Trivia Points
          </h1>

          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-primary text-accent-content">
                <th className="px-4 py-2 text-lg font-semibold">Category</th>
                <th className="px-4 py-2 text-lg font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-primary-content text-primary">
                <td className="border px-4 py-4 text-lg font-semibold">
                  Total Points
                </td>
                <td className="border px-4 py-4 text-2xl font-extrabold text-center text-accent">
                  {triviaData?.totalScore || 0}
                </td>
              </tr>
              <tr className="bg-primary-content text-primary">
                <td className="border px-4 py-4 text-lg font-semibold">Rank</td>
                <td className="border px-4 py-4 text-2xl font-extrabold text-center text-accent">
                  {triviaData?.rank || 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
