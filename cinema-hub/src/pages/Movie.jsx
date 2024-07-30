import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "../api/http";
import { STALE_TIME, IMAGE_URL, PLACEHOLDER_IMAGE } from "../utils/constants";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import StarRating from "../components/Movies/StarRating";
import { round } from "../utils/formatting";
import MovieDetail from "../components/Movies/MovieDetail";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { favoritesActions } from "../store/slices/favorites";

export default function Movie() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: ({ signal }) => fetchMovieDetails({ id, signal }),
    staleTime: STALE_TIME,
  });

  const isFavorite = useSelector((state) =>
    state.favorites.movies.some((movie) => movie.id === data?.id)
  );

  function handleFavoriteClick() {
    if (isFavorite) {
      dispatch(favoritesActions.removeMovie(data));
    } else {
      dispatch(favoritesActions.addMovie(data));
    }
  }

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
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 bg-base-300 px-8 lg:pr-80 rounded-lg shadow-md py-6 lg:py-0">
        <div className="flex flex-col gap-4 p-8">
          <h1 className="text-3xl font-bold">
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
              className="text-blue-500"
            >
              {data?.homepage}
            </a>
          </MovieDetail>
          <MovieDetail title="Release Date" delay={1}>
            <p>{data?.release_date}</p>
          </MovieDetail>
          <MovieDetail title="Runtime" delay={1.2}>
            <p>{data?.runtime} minutes</p>
          </MovieDetail>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4"
            transition={{ delay: 1.4 }}
          >
            {isFavorite ? (
              <FaHeart
                className="text-red-500 text-4xl cursor-pointer"
                onClick={handleFavoriteClick}
              />
            ) : (
              <FaRegHeart
                className="text-red-500 text-4xl cursor-pointer"
                onClick={handleFavoriteClick}
              />
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
