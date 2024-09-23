import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { STALE_TIME } from "../utils/constants";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import { fetchTriviaLeaderboard } from "../api/http";
import { Link } from "react-router-dom";
import Pager from "../components/UI/Pager";
import { useSearchParams } from "react-router-dom";
import { queryClient } from "../api/http";

export default function TriviaLeaderboard() {
  document.title = "Trivia Leaderboard";

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["triviaLeaderboard", currentPage], // Include currentPage in the query key
    queryFn: () => fetchTriviaLeaderboard({ page: currentPage }),
    staleTime: STALE_TIME,
    keepPreviousData: true, // Keep previous data while loading new data
  });

  const handlePageChange = (page) => {
    const newParams = { page: page.toString() };
    setSearchParams(newParams);
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <ErrorIndicator
        title="Failed to fetch trivia leaderboard"
        message={error?.message}
        error={error}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
      className="container mx-auto mt-5 p-4 flex flex-col items-center justify-center bg-base-200 rounded-lg shadow-lg"
    >
      <h1 className="text-4xl font-bold text-center mt-8">
        Trivia Leaderboard
      </h1>
      {data?.leaderboard && (
        <div className="flex flex-col items-center mt-4 w-full lg:w-1/2">
          <div className="self-start mb-4">
            <Link
              to="/trivia"
              className="text-accent hover:underline text-start"
            >
              To Trivia
            </Link>
          </div>
          <motion.table
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="table w-full rounded-lg overflow-hidden"
          >
            <thead className="bg-base-300 text-base-content rounded-t-lg">
              <tr>
                <th className="whitespace-nowrap">Rank</th>
                <th className="whitespace-nowrap">Username</th>
                <th className="whitespace-nowrap">Total Score</th>
                <th className="whitespace-nowrap">Best Attempt</th>
                <th className="whitespace-nowrap">Total Attempts</th>
              </tr>
            </thead>
            <tbody className="bg-base-100 text-base-content rounded-b-lg">
              {data.leaderboard.map((user, index) => {
                let rowClass = "";
                switch (index) {
                  case 0:
                    rowClass = "bg-yellow-500 text-base-100";
                    break;
                  case 1:
                    rowClass = "bg-gray-300 text-base-900";
                    break;
                  case 2:
                    rowClass = "bg-orange-400 text-base-100";
                    break;
                  default:
                    rowClass = "";
                }

                return (
                  <tr key={index} className={rowClass}>
                    <td className="whitespace-nowrap text-sm">{index + 1}</td>
                    <td className="whitespace-nowrap text-sm">
                      {user.username}
                    </td>
                    <td className="whitespace-nowrap text-sm">
                      {user.totalScore}
                    </td>
                    <td className="whitespace-nowrap text-sm">
                      {user.bestAttempt}
                    </td>
                    <td className="whitespace-nowrap text-sm">
                      {user.totalAttempts}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </motion.table>
          <div className="flex justify-center items-center mt-4">
            <Pager
              totalPages={data.totalPages}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
