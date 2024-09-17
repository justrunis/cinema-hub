import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { STALE_TIME } from "../utils/constants";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import Select from "../components/UI/Select";
import { fetchTriviaQuestions } from "../api/http";
import TriviaContainer from "../components/Trivia/TriviaContainer";
import { triviaActions } from "../store/slices/trivia";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { ALL_CATEGORIES, ALL_DIFFICULTIES } from "../utils/constants";

export default function Trivia() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showQuestions, setShowQuestions] = useState(false);
  const [questions, setQuestions] = useState([]);

  document.title = "Trivia";

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

  useEffect(() => {
    const handleNavigation = () => navigate("/trivia/trivia-history");

    const historyButton = document.getElementById("history-button");
    if (historyButton) {
      historyButton.addEventListener("click", handleNavigation);
    }

    return () => {
      if (historyButton) {
        historyButton.removeEventListener("click", handleNavigation);
      }
    };
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center p-8"
    >
      {!showQuestions ? (
        <div className="flex flex-col items-center justify-center bg-base-200 p-8 rounded-lg gap-4">
          <h1 className="text-4xl font-bold">Trivia</h1>
          <p className="text-lg text-center">
            Select a category and difficulty to start the trivia
          </p>
          <Select
            label="Category"
            id="category"
            options={ALL_CATEGORIES}
            value={trivia.category}
            renderOption={(option) => option.label}
            className="bg-base-100 text-base-content w-60 h-10 p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            onChange={handleChange}
          />
          <Select
            label="Difficulty"
            id="difficulty"
            options={ALL_DIFFICULTIES}
            value={trivia.difficulty}
            renderOption={(option) => option.label}
            className="bg-base-100 text-base-content w-60 h-10 p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            onChange={handleChange}
          />
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button
              onClick={onClick}
              className="btn btn-primary text-primary-content"
            >
              Start Trivia
            </Button>
            <Button
              id="history-button"
              className="btn btn-accent text-accent-content"
            >
              Trivia history
            </Button>
            <Button
              onClick={() => navigate("/trivia/leaderboard")}
              className="btn btn-warning text-warning-content"
            >
              Leaderboard
            </Button>
          </div>
        </div>
      ) : (
        <TriviaContainer
          category={trivia.category}
          difficulty={trivia.difficulty}
        />
      )}
    </motion.div>
  );
}
