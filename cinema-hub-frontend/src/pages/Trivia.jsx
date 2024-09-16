import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { STALE_TIME } from "../utils/constants";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import Select from "../components/UI/Select";
import { fetchTriviaQuestions } from "../api/http";
import TriviaContainer from "../components/Trivia/TriviaContainer";
import { triviaActions } from "../store/slices/trivia";
import { useSelector, useDispatch } from "react-redux";

const allCategories = [
  { value: 11, label: "Movies" },
  { value: 14, label: "Television" },
  { value: 31, label: "Anime & Manga" },
  {
    value: 32,
    label: "Cartoon & Animations",
  },
];

const allDifficulties = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export default function Trivia() {
  const dispatch = useDispatch();

  const [showQuestions, setShowQuestions] = useState(false);
  const [questions, setQuestions] = useState([]);

  const { mutate } = useMutation({
    mutationFn: fetchTriviaQuestions,
    staleTime: STALE_TIME,
    onSuccess: (data) => {
      setQuestions(data);
      dispatch(triviaActions.setQuestions(data));
    },
  });

  const [trivia, setTrivia] = useState({
    category: "",
    difficulty: "",
  });

  const handleChange = (event) => {
    setTrivia((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const onClick = () => {
    const { category, difficulty } = trivia;
    if (!category || !difficulty) {
      return;
    }
    mutate({ category, difficulty });
    dispatch(triviaActions.setTrivia(trivia));
    setShowQuestions(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center p-8 w-full max-w-screen-xl mx-auto"
    >
      <h1 className="text-4xl font-bold">Trivia</h1>
      {!showQuestions ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <Select
            label="Category"
            id="category"
            options={allCategories}
            value={trivia.category}
            renderOption={(option) => option.label}
            className="bg-base-100 text-base-content w-60 h-10 p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            onChange={handleChange}
          />
          <Select
            label="Difficulty"
            id="difficulty"
            options={allDifficulties}
            value={trivia.difficulty}
            renderOption={(option) => option.label}
            className="bg-base-100 text-base-content w-60 h-10 p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            onChange={handleChange}
          />
          <button onClick={onClick} className="btn btn-primary">
            Start Trivia
          </button>
        </div>
      ) : (
        <TriviaContainer />
      )}
    </motion.div>
  );
}
