import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useState } from "react";
import MovieCard from "../Movies/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { fetchUsersWatchlist } from "../../api/http";
import { STALE_TIME } from "../../utils/constants";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { Link } from "react-router-dom";

export default function Watchlist() {
  const token = useSelector((state) => state.login.token);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["watchlist"],
    queryFn: () => fetchUsersWatchlist({ token }),
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorIndicator title="Failed to fetch watchlist" error={error} />;
  }

  if (data?.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full p-6 bg-base-300 rounded-lg">
        <p>
          You have no movies or shows in your watchlist. Add some movies or
          shows to your watchlist to see them here.
        </p>
        <div className="flex flex-row items-center justify-center gap-4">
          <Link
            to="/movies"
            className="btn btn-primary"
            onClick={() => dispatch(favoritesActions.clearFavorites())}
          >
            Go to Movies
          </Link>
          <Link
            to="/shows"
            className="btn btn-primary"
            onClick={() => dispatch(favoritesActions.clearFavorites())}
          >
            Go to Shows
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full p-6 bg-base-300 rounded-lg">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {data?.map((favorite) => (
          <MovieCard key={favorite._id} movie={favorite} />
        ))}
      </div>
    </div>
  );
}
