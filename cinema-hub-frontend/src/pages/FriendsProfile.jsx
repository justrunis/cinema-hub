import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUserFriendsProfileInfo } from "../api/http";
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

  const friendInfo = data?.friendInfo;

  const friendFavorites = data?.favorites;

  const friendWatchlist = data?.watchlist;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full p-6">
        <ErrorIndicator title="Failed to fetch friend's profile" />
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
      className="flex flex-col items-center gap-4 w-full h-full p-6 mx-8 bg-base-200"
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

      {/* Favorites */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl p-6 bg-base-100 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-4">Favorite Movies & Shows</h1>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {friendFavorites?.map((favorite) => (
            <MovieCard key={favorite.itemId} movie={favorite} />
          ))}
        </div>
      </motion.div>

      {/* Watchlist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl p-6 bg-base-100 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-4">Watchlist</h1>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {friendWatchlist?.map((watchlistItem) => (
            <MovieCard key={watchlistItem.itemId} movie={watchlistItem} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
