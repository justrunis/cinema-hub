import { motion } from "framer-motion";
import { getUsersTriviaAnswers } from "../api/http";
import { useQuery } from "@tanstack/react-query";
import { STALE_TIME, ALL_CATEGORIES } from "../utils/constants";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import { makeFirstLetterUpperCase } from "../utils/formatting";

export default function UsersTrivia() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["usersTrivia"],
    queryFn: getUsersTriviaAnswers,
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorIndicator title="Failed to load users trivia" error={error} />;
  }

  const getCategoryLabel = (categoryValue) => {
    const category = ALL_CATEGORIES.find(
      (cat) => Number(cat.value) === Number(categoryValue)
    );
    return category ? category.label : "Unknown";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center justify-center gap-8 p-6 bg-base-200 rounded-lg w-full max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-center">My Trivia History</h1>
      {data.length === 0 && (
        <p className="text-lg text-center col-span-full text-error">
          You have not played any trivia yet.
        </p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((user, index) => (
          <motion.div
            key={user._id}
            variants={itemVariants}
            className="bg-base-300 text-base-content shadow-lg p-6 rounded-lg flex flex-col justify-between h-full transform hover:scale-105 transition-transform"
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              Trivia {index + 1}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <p className="text-lg flex justify-between">
                <span className="font-semibold">Correct Answers:</span>{" "}
                {user.correctAnswers}
              </p>
              <p className="text-lg flex justify-between">
                <span className="font-semibold">Category:</span>{" "}
                {getCategoryLabel(user.category)}
              </p>
              <p className="text-lg flex justify-between">
                <span className="font-semibold">Difficulty:</span>{" "}
                {makeFirstLetterUpperCase(user.difficulty)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
