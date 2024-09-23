import { motion } from "framer-motion";
import { getUsersTriviaAnswers } from "../api/http";
import { useQuery } from "@tanstack/react-query";
import { STALE_TIME } from "../utils/constants";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import UserTriviaCard from "../components/Trivia/UserTriviaCard";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Pager from "../components/UI/Pager";

export default function UsersTrivia() {
  document.title = "Trivia History";

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["usersTrivia", currentPage],
    queryFn: () => getUsersTriviaAnswers({ page: currentPage }),
    staleTime: STALE_TIME,
    keepPreviousData: true,
  });

  console.log(data);

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
        title="Failed to load users trivia"
        message={error?.message}
        error={error}
      />
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const overallAverage =
    Math.round(
      (data?.triviaAnswers.reduce((acc, user) => acc + user.correctAnswers, 0) /
        data?.triviaAnswers.length /
        10) *
        100
    ) || 0;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col gap-8 p-6 bg-base-200 rounded-lg w-full max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-center">My Trivia History</h1>
      <div className="flex justify-start items-start">
        <Link to="/trivia" className="text-accent hover:underline text-start">
          To Trivia
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-primary text-base-100 p-6 rounded-lg shadow-lg text-center"
      >
        <h3 className="text-2xl font-bold">
          Your Trivia Average is{" "}
          <span className="text-4xl font-extrabold">{overallAverage}%</span>
        </h3>
      </motion.div>

      {data?.triviaAnswers.length === 0 && (
        <p className="text-lg text-center col-span-full text-error">
          You have not played any trivia yet.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.triviaAnswers.map((trivia, index) => (
          <UserTriviaCard key={trivia._id} trivia={trivia} index={index} />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Pager
          currentPage={currentPage}
          totalPages={data.totalPages}
          setCurrentPage={handlePageChange}
        />
      </div>
    </motion.div>
  );
}
