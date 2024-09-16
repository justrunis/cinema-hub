import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMovies, fetchTrendingShows } from "../api/http";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import { STALE_TIME } from "../utils/constants";
import MovieCard from "../components/Movies/MovieCard";
import ShowCard from "../components/Shows/ShowCard";

export default function Home() {
  document.title = "Home";

  const {
    data: trendingMovies,
    isLoading: isMoviesLoading,
    isError: isMoviesError,
    error: moviesError,
  } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: ({ signal }) =>
      fetchTrendingMovies({ currentPage: 1, signal, query: "" }),
    staleTime: STALE_TIME,
  });

  const {
    data: trendingShows,
    isLoading: isShowsLoading,
    isError: isShowsError,
    error: showsError,
  } = useQuery({
    queryKey: ["trendingShows"],
    queryFn: ({ signal }) =>
      fetchTrendingShows({ currentPage: 1, signal, query: "" }),
    staleTime: STALE_TIME,
  });

  if (isMoviesLoading || isShowsLoading) {
    return <LoadingIndicator />;
  }

  if (isMoviesError || isShowsError) {
    return <ErrorIndicator title="An error occurred" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex flex-col items-center p-8 w-full max-w-screen-xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center animated-gradient from-primary to-accent bg-gradient-to-r text-white rounded-lg p-6 mb-12 w-full"
      >
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Cinema Hub</h1>
        <p className="text-xl mb-6">
          Discover the latest and greatest in movies and TV shows. Dive into
          your next favorite flick with ease.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/movies">
            <Button className="btn btn-primary text-primary-content">
              Browse Movies
            </Button>
          </Link>
          <Link to="/shows">
            <Button className="btn btn-primary text-primary-content">
              Browse TV Shows
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="flex flex-col gap-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-base-200 shadow-lg p-6 rounded-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Trending Movies
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {trendingMovies?.results.slice(0, 5).map((movie) => (
              <MovieCard key={movie.id} movie={movie} showStars={false} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-base-200 shadow-lg p-6 rounded-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Trending TV Shows
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {trendingShows?.results.slice(0, 5).map((show) => (
              <ShowCard key={show.id} show={show} showStars={false} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
