import { useState } from "react";
import AnswerButton from "./AnswerButton";

export default function Question({ question, answers, onAnswer, feedback }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleClick = (answer) => {
    if (animating) return; // Prevent multiple clicks during animation

    setSelectedAnswer(answer);
    setAnimating(true);
    onAnswer(answer);

    // Reset animation state after a delay
    setTimeout(() => {
      setAnimating(false);
    }, 1000); // Match the duration of your animation
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-base-200 rounded-lg">
      <h1 className="text-2xl text-center mb-4">{question}</h1>
      <div className="grid grid-cols-2 gap-4 w-full">
        {answers.map((answer, index) => (
          <AnswerButton
            key={index}
            answer={answer}
            selectedAnswer={selectedAnswer}
            onClick={() => handleClick(answer)}
            animating={animating}
            feedback={feedback}
          />
        ))}
      </div>
      {feedback && <p className="mt-4 text-lg">{feedback}</p>}
    </div>
  );
}
