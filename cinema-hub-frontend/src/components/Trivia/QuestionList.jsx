export default function QuestionList({ userAnswers }) {
  return (
    <div className="flex flex-col items-start">
      {userAnswers.map((answer, index) => (
        <div key={index} className="mb-4 p-4 bg-base-300 rounded-lg w-full">
          <h2 className="text-lg font-bold">{answer.question}</h2>
          <p className={`text-red-500 ${answer.isCorrect ? "" : "font-bold"}`}>
            Your answer: {answer.selectedAnswer}
          </p>
          <p
            className={`text-green-500 ${answer.isCorrect ? "" : "font-bold"}`}
          >
            Correct answer: {answer.correctAnswer}
          </p>
        </div>
      ))}
    </div>
  );
}
