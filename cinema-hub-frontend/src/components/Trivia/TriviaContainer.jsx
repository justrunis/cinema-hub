import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Question from "./Question";
import QuestionList from "./QuestionList";
import { decodeHtml } from "../../utils/formatting";
import { useMutation } from "@tanstack/react-query";
import { addUserTriviaAnswers } from "../../api/http";
import { queryClient } from "../../api/http";
import Button from "../UI/Button";

export default function TriviaContainer({ category, difficulty }) {
  const questions = useSelector((state) => state.trivia.questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const { mutate } = useMutation({
    mutationFn: addUserTriviaAnswers,
    onSuccess: () => {
      console.log("Trivia answers added successfully");
      queryClient.invalidateQueries("usersTrivia");
    },
  });

  const handleAnswer = (answer) => {
    const isCorrect = answer === decodeHtml(currentQuestion.correct_answer);

    const newAnswer = {
      question: decodeHtml(currentQuestion.question),
      selectedAnswer: answer,
      correctAnswer: decodeHtml(currentQuestion.correct_answer),
      isCorrect,
    };

    const updatedAnswers = [...userAnswers, newAnswer];

    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      mutate({
        category,
        difficulty,
        correctAnswers: updatedAnswers.filter((answer) => answer.isCorrect)
          .length,
        questions: updatedAnswers,
      });
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 p-6 bg-base-200 rounded-lg"
      >
        <div className="flex justify-start items-start mt-4">
          <Button
            className="text-accent hover:underline text-start"
            onClick={() => window.location.reload()}
          >
            Play again
          </Button>
        </div>
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
