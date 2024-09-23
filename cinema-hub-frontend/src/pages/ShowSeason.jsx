import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchShowSeasonDetails } from "../api/http";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import { STALE_TIME, IMAGE_URL } from "../utils/constants";
import ShowDetail from "../components/Shows/ShowDetail";
import StarRating from "../components/Movies/StarRating";
import Show from "./Show";
import { PLACEHOLDER_IMAGE } from "../utils/constants";

export default function ShowSeason() {
  const { id, season } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["showSeason", id, season],
    queryFn: ({ signal }) => fetchShowSeasonDetails({ id, season, signal }),
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <ErrorIndicator
        title="Failed to fetch show season"
        message={error.message}
      />
    );
  }

  if (!isError && !isLoading) {
    return (
      <motion.div
        className="flex flex-col justify-center gap-5 items-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex flex-col justify-center bg-base-300 rounded-lg shadow-md p-6 w-half">
          <div className="flex justify-start px-4 py-6 gap-4">
            <Link
              to={`/shows/${id}`}
              className="text-accent hover:underline text-start"
            >
              Go back to show
            </Link>
            <Link
              to={`/shows`}
              className="text-accent hover:underline text-start"
            >
              Go back to all shows
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <div className="flex flex-col gap-4 p-8">
              <h1 className="text-3xl font-bold text-center">{data.name}</h1>
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
              <ShowDetail title="Air date" delay={0.2}>
                <p>{data.air_date}</p>
              </ShowDetail>
              <ShowDetail title="Overview" delay={0.4}>
                {data.overview.length > 0 ? (
                  <p className="max-w-sm">{data.overview}</p>
                ) : (
                  <p className="max-w-sm">No overview found.</p>
                )}
              </ShowDetail>
              <ShowDetail title="Episodes" delay={0.6}>
                {data.episodes.length > 0 ? (
                  <ul className="grid grid-cols-10 gap-2">
                    {data.episodes.map((episode) => (
                      <li key={episode.id}>
                        <Link
                          to={`/shows/${id}/season/${season}/episode/${episode.episode_number}`}
                          className="text-accent hover:underline"
                        >
                          {episode.episode_number}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No episodes found.</p>
                )}
              </ShowDetail>
              <ShowDetail title="Rating" delay={0.8}>
                <StarRating
                  className="flex items-center gap-2"
                  rating={data.vote_average}
                />
              </ShowDetail>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
}
