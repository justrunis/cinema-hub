import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Question from "./Question";
import QuestionList from "./QuestionList";
import { decodeHtml } from "../../utils/formatting";

export default function TriviaContainer() {
  const questions = useSelector((state) => state.trivia.questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    const isCorrect = answer === decodeHtml(currentQuestion.correct_answer);

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: decodeHtml(currentQuestion.question),
        selectedAnswer: answer,
        correctAnswer: decodeHtml(currentQuestion.correct_answer),
        isCorrect,
      },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center gap-4 p-6 bg-base-200 rounded-lg"
      >
        <h1 className="text-2xl text-center">
          You have answered{" "}
          {Math.round(
            (userAnswers.filter((answer) => answer.isCorrect).length /
              questions.length) *
              100
          )}
          % of questions correctly!
        </h1>
        <h2 className="text-2xl text-center">Questions summary</h2>
        <QuestionList userAnswers={userAnswers} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-4 p-6 bg-base-200 rounded-lg"
    >
      {questions.length > 0 && (
        <Question
          question={decodeHtml(currentQuestion.question)}
          answers={[
            ...currentQuestion.incorrect_answers.map(decodeHtml),
            decodeHtml(currentQuestion.correct_answer),
          ]}
          onAnswer={handleAnswer}
        />
      )}
    </motion.div>
  );
}
