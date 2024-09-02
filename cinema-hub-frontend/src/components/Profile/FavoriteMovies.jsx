import MovieCard from "../Movies/MovieCard";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { favoritesActions } from "../../store/slices/favorites";
import { fetchUsersFavorites } from "../../api/http";
import { STALE_TIME } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";

export default function FavoriteMovies() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => fetchUsersFavorites({ token }),
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorIndicator title="Failed to fetch favorites" error={error} />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full p-6 bg-base-300 rounded-lg">
      {data?.length <= 0 ? (
        <p className="flex items-center justify-center text-center text-primary font-bold">
          <p>No favorites found</p>
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
