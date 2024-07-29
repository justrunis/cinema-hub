import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "../api/http";
import { STALE_TIME, IMAGE_URL } from "../utils/constants";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import StarRating from "../components/Movies/StarRating";
import { round } from "../utils/formatting";

export default function Movie() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: ({ signal }) => fetchMovieDetails({ id, signal }),
    staleTime: STALE_TIME,
  });

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
    console.log(data);
  }

  return (
    <motion.div
      className="flex flex-col justify-center gap-5 items-center h-screen bg-base-100 p-18"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-row items-center justify-center gap-4 bg-base-300 px-8 lg:pr-80 rounded-lg shadow-md">
        <div className="flex flex-col gap-4 p-8">
          <h1 className="text-3xl font-bold">
            {data.title || data.original_title}
          </h1>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={
              data.poster_path
                ? `${IMAGE_URL}${data.poster_path}`
                : "https://via.placeholder.com/500x700.png?text=No+Image"
            }
            alt={data.title}
            className="rounded-lg w-full h-auto"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Genres</h2>
          <ul className="flex gap-2">
            {data.genres.map((genre) => (
              <li className="" key={genre.id}>
                {genre.name}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Rating</h2>
            <StarRating
              className="flex items-center gap-2"
              rating={round(data.vote_average, 1)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Overview</h2>
            <p className="max-w-sm">{data.overview}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Homepage</h2>
            <a
              href={data.homepage}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              {data.homepage}
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Release Date</h2>
            <p>{data.release_date}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Runtime</h2>
            <p>{data.runtime} minutes</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
