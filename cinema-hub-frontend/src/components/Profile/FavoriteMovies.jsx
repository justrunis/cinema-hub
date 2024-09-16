import MovieCard from "../Movies/MovieCard";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { favoritesActions } from "../../store/slices/favorites";
import { fetchUsersFavorites } from "../../api/http";
import { STALE_TIME } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { Link } from "react-router-dom";

export default function FavoriteMovies() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("cinema-hub-token");

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

  if (data?.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full p-6 bg-base-300 rounded-lg">
        <p>
          You have no movies or shows in your favorites. Add some movies or
          shows to your favorites to see them here.
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
