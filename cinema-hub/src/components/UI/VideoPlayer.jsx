import { motion } from "framer-motion";
import { fetchMovieVideos, fetchShowVideos } from "../../api/http";
import { useQuery } from "@tanstack/react-query";
import { STALE_TIME } from "../../utils/constants";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";

export default function VideoPlayer({ id, type, delay }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["videos", id],
    queryFn: ({ signal }) => {
      if (type === "movie") {
        return fetchMovieVideos({ id, signal });
      } else if (type === "tv") {
        return fetchShowVideos({ id, signal });
      }
    },
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <div className="flex justify-center p-6">
        <ErrorIndicator message={error.message} />
      </div>
    );
  }

  if (!isError && !isLoading && data?.results.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay }}
        className="rounded-lg shadow-lg lg:w-1/2 mx-auto"
      >
        <h2 className="text-2xl font-bold text-center">Trailer</h2>
        <motion.iframe
          src={`https://www.youtube.com/embed/${data?.results[0].key}`}
          title={data?.name}
          className="rounded-lg w-full"
          height={315}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </motion.div>
    );
  }
}
