import { useLocation } from "react-router-dom";
import QuestionList from "../components/Trivia/QuestionList";
import { motion } from "framer-motion";

export default function UsersTriviaHistory() {
  const location = useLocation();

  const questions = location?.state?.questions;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center justify-center gap-8 p-6 bg-base-200 rounded-lg w-full max-w-4xl mx-auto my-5"
    >
      <h1 className="text-3xl font-bold text-center">Questions</h1>
      {!questions ? (
        <p className="text-lg text-center col-span-full text-error">
          Cannot find any questions.
        </p>
      ) : (
        <QuestionList userAnswers={questions} />
      )}
    </motion.div>
  );
}
