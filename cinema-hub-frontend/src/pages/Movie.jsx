import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchMovieDetails,
  isItemFavorite,
  isItemInWatchlist,
  fetchSimilarMovies,
} from "../api/http";
import { STALE_TIME, IMAGE_URL, PLACEHOLDER_IMAGE } from "../utils/constants";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import StarRating from "../components/Movies/StarRating";
import { round } from "../utils/formatting";
import MovieDetail from "../components/Movies/MovieDetail";
import { FaHeart, FaRegHeart, FaListAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { favoritesActions } from "../store/slices/favorites";
import { watchlistActions } from "../store/slices/wathclist";
import Button from "../components/UI/Button";
import VideoPlayer from "../components/UI/VideoPlayer";
import MovieReviews from "../components/Movies/MovieReviews";
import MovieCredits from "../components/Movies/MovieCredits";
import MovieCard from "../components/Movies/MovieCard";
import { useState, useEffect } from "react";

export default function Movie() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const token = localStorage.getItem("cinema-hub-token");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: ({ signal }) => fetchMovieDetails({ id, signal }),
    staleTime: STALE_TIME,
  });

  const { data: isFavoriteData, isLoading: isFavoriteLoading } = useQuery({
    queryKey: ["isFavorite", id],
    queryFn: ({ signal }) => isItemFavorite({ itemId: id, token, signal }),
    staleTime: STALE_TIME,
  });

  const [isFavorite, setIsFavorite] = useState(isFavoriteData?.isFavorite);

  useEffect(() => {
    if (isFavoriteData?.isFavorite !== undefined) {
      setIsFavorite(isFavoriteData.isFavorite);
    }
  }, [isFavoriteData]);

  const { data: isInWatchlist, isLoading: isWatchlistLoading } = useQuery({
    queryKey: ["isWatchlist", id],
    queryFn: ({ signal }) => isItemInWatchlist({ itemId: id, token, signal }),
    staleTime: STALE_TIME,
  });

  const [isWatchlist, setIsWatchlist] = useState(isInWatchlist?.isInWatchlist);

  useEffect(() => {
    if (isInWatchlist?.isInWatchlist !== undefined) {
      setIsWatchlist(isInWatchlist.isInWatchlist);
    }
  }, [isInWatchlist]);

  const { data: similarMovies, isLoading: isSimilarMoviesLoading } = useQuery({
    queryKey: ["similarMovies", id],
    queryFn: ({ signal }) => fetchSimilarMovies({ id, signal }),
    staleTime: STALE_TIME,
  });

  function addFavorite() {
    setLoading(true);
    const payload = {
      itemId: data.id,
      itemType: "movie",
      title: data.title || data.original_title,
      original_name: data.original_name || data.title || "Unknown",
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      token: localStorage.getItem("cinema-hub-token"),
    };
    dispatch(favoritesActions.addFavorite(payload));
    setLoading(false);
    setIsFavorite(true);
  }

  function removeFavorite() {
    setLoading(true);
    const payload = {
      token: localStorage.getItem("cinema-hub-token"),
      id: data?.id,
    };
    dispatch(favoritesActions.removeFavorite(payload));
    setLoading(false);
    setIsFavorite(false);
  }

  function addWatchlist() {
    setLoading(true);
    const payload = {
      itemId: data.id,
      itemType: "movie",
      title: data.title || data.original_title,
      original_name: data.original_name || data.title || "Unknown",
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      token: localStorage.getItem("cinema-hub-token"),
    };
    dispatch(watchlistActions.addWatchlist(payload));
    setLoading(false);
    setIsWatchlist(true);
  }

  function removeWatchlist() {
    setLoading(true);
    const payload = {
      token: localStorage.getItem("cinema-hub-token"),
      id: data?.id,
    };
    dispatch(watchlistActions.removeWatchlist(payload));
    setLoading(false);
    setIsWatchlist(false);
  }

  const buttonClass = "flex items-center gap-2 btn rounded-lg";
  const iconClass = "text-4xl cursor-pointer";
  const textClass = "font-bold text-sm";

  const favButtonProps = isFavorite
    ? {
        className: `${buttonClass} bg-accent text-primary-content hover:bg-red-600`,
        icon: <FaHeart className={`text-primary ${iconClass}`} />,
        text: "Remove from favorites",
        onClick: removeFavorite,
      }
    : {
        className: `${buttonClass} bg-primary text-primary-content hover:bg-accent`,
        icon: <FaRegHeart className={`text-primary-content ${iconClass}`} />,
        text: "Add to favorites",
        onClick: addFavorite,
      };

  const watchlistButtonProps = isWatchlist
    ? {
        className: `${buttonClass} bg-accent text-primary-content hover:bg-red-600`,
        text: "Remove from watchlist",
        icon: <FaListAlt className={`text-primary ${iconClass}`} />,
        onClick: removeWatchlist,
      }
    : {
        className: `${buttonClass} bg-primary text-primary-content hover:bg-accent`,
        text: "Add to watchlist",
        icon: <FaListAlt className={`text-primary-content ${iconClass}`} />,
        onClick: addWatchlist,
      };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <div className="flex justify-center p-6">
        <ErrorIndicator
          title="Failed to fetch movie details"
          message={error?.message || "An unknown error occurred"}
        />
      </div>
    );
  }

  if (data) {
    document.title = `${data.title || data.original_title}`;
  }

  return (
    <motion.div
      className="flex flex-col justify-center gap-5 items-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {loading && <LoadingIndicator />}
      <div className="flex flex-col justify-center bg-base-300 rounded-lg shadow-md pt-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-around p-8">
          <div className="flex flex-col gap-4 p-8">
            <h1 className="text-3xl font-bold text-center">
              {data?.title || data?.original_title}
            </h1>
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={
                data?.poster_path
                  ? `${IMAGE_URL}${data.poster_path}`
                  : PLACEHOLDER_IMAGE
              }
              alt={data?.title}
              className="rounded-lg w-auto h-auto"
            />
          </div>
          <div className="flex flex-col gap-4">
            <MovieDetail title="Details" delay={0.2}>
              <ul className="flex gap-2">
                {data?.genres.map((genre) => (
                  <li className="" key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </MovieDetail>
            <MovieDetail title="Rating" delay={0.4}>
              <StarRating
                className="flex items-center gap-2"
                rating={round(data?.vote_average, 1)}
              />
            </MovieDetail>
            <MovieDetail title="Overview" delay={0.6}>
              <p className="max-w-sm">{data?.overview}</p>
            </MovieDetail>
            <MovieDetail title="Homepage" delay={0.8}>
              <a
                href={data?.homepage}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                {data?.homepage}
              </a>
            </MovieDetail>
          </div>
          <div className="flex flex-col gap-4">
            <MovieDetail title="Release Date" delay={1}>
              <p>{data?.release_date}</p>
            </MovieDetail>
            <MovieDetail title="Runtime" delay={1.2}>
              <p>{data?.runtime} minutes</p>
            </MovieDetail>
            <MovieDetail title="Reviews" delay={1.4}>
              <p>{data?.vote_count} reviews</p>
            </MovieDetail>
          </div>
        </div>
        <div className="self-center flex flex-col items-center justify-center gap-4 px-8 pb-6 max-w-7xl w-full">
          <VideoPlayer id={data?.id} type="movie" />
          {/* Favorite and Watchlist Buttons */}
          {token && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col lg:flex-row items-center gap-4"
              transition={{ delay: 1.4 }}
            >
              <Button
                onClick={favButtonProps.onClick}
                className={favButtonProps.className}
                disabled={isFavoriteLoading || loading}
              >
                {favButtonProps.icon}
                <p className={`text-primary-content ${textClass}`}>
                  {favButtonProps.text}
                </p>
              </Button>

              <Button
                onClick={watchlistButtonProps.onClick}
                className={watchlistButtonProps.className}
                disabled={isWatchlistLoading || loading}
              >
                {watchlistButtonProps.icon}
                <p className={`text-primary-content ${textClass}`}>
                  {watchlistButtonProps.text}
                </p>
              </Button>
            </motion.div>
          )}
          <div className="flex flex-col items-center justify-center gap-4 px-8">
            <h2 className="text-2xl font-bold">Similar Movies</h2>
            <div className="grid gap-4 grid-cols-3 lg:grid-cols-6">
              {isSimilarMoviesLoading ? (
                <LoadingIndicator />
              ) : (
                similarMovies?.results
                  .slice(0, 6)
                  .map((movie) => (
                    <MovieCard key={movie.id} movie={movie} showStars={false} />
                  ))
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 px-8">
            <MovieCredits id={data?.id} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 bg-base-300 px-8 rounded-lg shadow-md py-6 w-full">
        <MovieReviews id={data?.id} />
      </div>
    </motion.div>
  );
}
