import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchShowDetails } from "../api/http";
import { STALE_TIME, IMAGE_URL, PLACEHOLDER_IMAGE } from "../utils/constants";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import StarRating from "../components/Movies/StarRating";
import { round } from "../utils/formatting";
import ShowDetail from "../components/Shows/ShowDetail";
import ShowDetailsGrid from "../components/Shows/ShowDeailsGrid";
import { useEffect } from "react";

export default function Show() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["show", id],
    queryFn: ({ signal }) => fetchShowDetails({ id, signal }),
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <div className="flex justify-center p-6">
        <ErrorIndicator
          title="Failed to fetch show details"
          message={error?.message || "An unknown error occurred"}
        />
      </div>
    );
  }

  if (data) {
    document.title = `${data.name || data.original_name}`;
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
            {data.name || data.original_name}
          </h1>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={
              data.poster_path
                ? `${IMAGE_URL}${data.poster_path}`
                : PLACEHOLDER_IMAGE
            }
            alt={data.name}
            className="rounded-lg w-auto h-auto"
          />
        </div>

        <div className="flex flex-col gap-4">
          <ShowDetail title="Details" delay={0.2}>
            <ul className="flex gap-2">
              {data.genres.map((genre) => (
                <li className="" key={genre.id}>
                  {genre.name}
                </li>
              ))}
            </ul>
          </ShowDetail>
          <ShowDetail title="Rating" delay={0.4}>
            <StarRating
              className="flex items-center gap-2"
              rating={round(data.vote_average / 2, 1)}
            />
          </ShowDetail>
          <ShowDetail title="Overview" delay={0.6}>
            <p className="max-w-sm">{data.overview}</p>
          </ShowDetail>
          <ShowDetail title="Homepage" delay={0.8}>
            <a
              href={data.homepage}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              {data.homepage}
            </a>
          </ShowDetail>
          <ShowDetailsGrid data={data} />
        </div>
      </div>
    </motion.div>
  );
}
