import { motion } from "framer-motion";
import Card from "../UI/Card";
import StarRating from "./StarRating";
import { IMAGE_URL } from "../../utils/constants";
import { round } from "../../utils/formatting";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/movies/${movie.id}`);
  }

  return (
    <Card
      key={movie.id}
      className="flex flex-col justify-center items-center bg-base-100 p-4 rounded-lg shadow-md"
      onClick={handleClick}
    >
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src={
          movie.poster_path
            ? `${IMAGE_URL}${movie.poster_path}`
            : "https://via.placeholder.com/500x700.png?text=No+Image"
        }
        alt={movie.title}
        className="rounded-lg w-full h-auto"
      />
      <h2 className="text-xl font-bold mt-2">
        {movie.original_name || movie.title}
      </h2>
      <div className="flex items-center gap-2">
        <StarRating rating={movie.vote_average} />
      </div>
    </Card>
  );
}
