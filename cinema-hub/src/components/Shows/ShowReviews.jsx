import { motion } from "framer-motion";
import { fetchShowReviews } from "../../api/http";
import { useQuery } from "@tanstack/react-query";
import { STALE_TIME } from "../../utils/constants";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { useState } from "react";
import Pager from "../UI/Pager";
import { formatDate } from "../../utils/formatting";
import StarRating from "../Movies/StarRating";

export default function ShowReviews({ id }) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews", id, currentPage],
    queryFn: ({ signal }) => fetchShowReviews({ id, signal, currentPage }),
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

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  if (!isError && !isLoading) {
    return (
      <>
        <h2 className="text-2xl font-bold text-center">Reviews</h2>
        <div className="flex flex-col gap-4 px-8 mx-4">
          {data.results.length === 0 && (
            <p className="text-lg font-semibold text-center">
              No reviews found.
            </p>
          )}
          {data.results.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-300 p-4 rounded-lg cursor-pointer"
            >
              <div className="flex justify-between">
                <span className="font-semibold">
                  {review.author_details.username}
                </span>
                <div className="flex items-end gap-4">
                  <span className="text-lg font-semibold">
                    {formatDate(review.created_at)}
                  </span>
                  <StarRating
                    rating={review.author_details.rating}
                    className="mt-2"
                  />
                </div>
              </div>
              <p className="text-sm mt-2">{review.content}</p>
            </motion.div>
          ))}
          {data.total_pages > 1 && (
            <div className="flex justify-center">
              <Pager
                currentPage={currentPage}
                totalPages={data.total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </>
    );
  }
}
