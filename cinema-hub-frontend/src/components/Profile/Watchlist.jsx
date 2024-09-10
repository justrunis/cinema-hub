import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useState } from "react";
import MovieCard from "../Movies/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { fetchUsersWatchlist } from "../../api/http";
import { STALE_TIME } from "../../utils/constants";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";

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

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full p-6 bg-base-300 rounded-lg">
      {data?.length <= 0 ? (
        <p className="flex items-center justify-center text-center text-primary font-bold">
          <p>No watchlist found</p>
        </p>
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
          {data?.map((favorite) => (
            <MovieCard key={favorite._id} movie={favorite} />
          ))}
        </div>
      )}
    </div>
  );
}
