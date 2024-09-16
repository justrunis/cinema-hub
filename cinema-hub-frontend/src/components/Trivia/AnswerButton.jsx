import { motion } from "framer-motion";
import Button from "../UI/Button";

const blinkAnimation = {
  blink: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.5, 1],
    transition: { duration: 0.3 },
  },
};

export default function AnswerButton({
  answer,
  selectedAnswer,
  onClick,
  animating,
  feedback,
}) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={selectedAnswer === answer ? "blink" : ""}
      variants={blinkAnimation}
      className={`flex rounded-lg items-center justify-center ${
        feedback === "Correct!" && answer === selectedAnswer
          ? "bg-green-500"
          : feedback === "Incorrect!" && answer === selectedAnswer
          ? "bg-red-500"
          : "bg-accent"
      }`}
    >
      <Button
        onClick={onClick}
        className="w-full text-white py-3"
        disabled={animating}
      >
        {answer}
      </Button>
    </motion.div>
  );
}
