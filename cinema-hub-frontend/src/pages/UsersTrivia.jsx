import { motion } from "framer-motion";
import { getUsersTriviaAnswers } from "../api/http";
import { useQuery } from "@tanstack/react-query";
import { STALE_TIME } from "../utils/constants";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import UserTriviaCard from "../components/Trivia/UserTriviaCard";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const overallAverage = Math.round(
    (data.reduce((acc, user) => acc + user.correctAnswers, 0) /
      data.length /
      10) *
      100
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center justify-center gap-8 p-6 bg-base-200 rounded-lg w-full max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-center">My Trivia History</h1>

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

      {data.length === 0 && (
        <p className="text-lg text-center col-span-full text-error">
          You have not played any trivia yet.
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((trivia, index) => (
          <UserTriviaCard key={trivia._id} trivia={trivia} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
