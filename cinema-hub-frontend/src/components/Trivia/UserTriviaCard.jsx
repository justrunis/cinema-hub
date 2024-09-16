import { motion } from "framer-motion";
import { makeFirstLetterUpperCase } from "../../utils/formatting";
import { ALL_CATEGORIES } from "../../utils/constants";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";

export default function UserTriviaCard({ trivia, index }) {
  const navigate = useNavigate();

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const getCategoryLabel = (categoryValue) => {
    const category = ALL_CATEGORIES.find(
      (cat) => Number(cat.value) === Number(categoryValue)
    );
    return category ? category.label : "Unknown";
  };

  return (
    <Card
      key={trivia._id}
      variants={itemVariants}
      className="bg-gradient-to-r from-primary to-accent text-base-content shadow-lg p-8 rounded-lg flex flex-col justify-between h-full transform hover:scale-105 transition-transform"
      onClick={() =>
        navigate(`/trivia/trivia-history/${trivia._id}`, { state: trivia })
      }
    >
      <h2 className="text-2xl font-extrabold text-white mb-6 text-center">
        Trivia {index + 1}
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between text-lg">
          <span className="font-semibold text-white">Correct Answers:</span>
          <span className="font-bold text-white">
            {(trivia.correctAnswers / 10) * 100}%
          </span>
        </div>
        <div className="flex justify-between text-lg">
          <span className="font-semibold text-white">Category:</span>
          <span className="font-bold text-white">
            {getCategoryLabel(trivia.category)}
          </span>
        </div>
        <div className="flex justify-between text-lg">
          <span className="font-semibold text-white">Difficulty:</span>
          <span className="font-bold text-white">
            {makeFirstLetterUpperCase(trivia.difficulty)}
          </span>
        </div>
      </div>
    </Card>
  );
}
