import { useLocation } from "react-router-dom";
import QuestionList from "../components/Trivia/QuestionList";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function UsersTriviaHistory() {
  const location = useLocation();

  const questions = location?.state?.questions;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  document.title = "Trivia Questions";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col gap-8 p-6 bg-base-200 rounded-lg w-full max-w-4xl mx-auto my-5"
    >
      <h1 className="text-3xl font-bold text-center">Questions</h1>
      {!questions ? (
        <p className="text-lg text-center col-span-full text-error">
          Cannot find any questions.
        </p>
      ) : (
        <>
          <div className="flex justify-start items-start gap-4 mt-4">
            <Link
              to="/trivia/trivia-history"
              className="text-accent hover:underline text-start"
            >
              Back to History
            </Link>
            <Link
              to="/trivia"
              className="text-accent hover:underline text-start"
            >
              Play Again
            </Link>
          </div>
          <QuestionList userAnswers={questions} />
        </>
      )}
    </motion.div>
  );
}
