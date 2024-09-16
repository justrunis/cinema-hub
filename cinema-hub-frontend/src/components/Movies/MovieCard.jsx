import { motion } from "framer-motion";
import Card from "../UI/Card";
import StarRating from "./StarRating";
import { IMAGE_URL, PLACEHOLDER_IMAGE } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { round } from "../../utils/formatting";

export default function MovieCard({ movie, itemType = "movies" }) {
  const navigate = useNavigate();

  if (movie?.itemType) {
    itemType = movie.itemType;
    if (itemType === "tv") {
      itemType = "shows";
    } else {
      itemType = "movies";
    }
  }

  function handleClick() {
    navigate(`/${itemType}/${movie.itemId ? movie.itemId : movie.id}`);
  }

  return (
    <Card
      key={movie.id}
      className="flex flex-col justify-center items-center bg-base-100 p-4 sm:p-8 rounded-lg shadow-md"
      onClick={handleClick}
    >
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src={
          movie.poster_path
            ? `${IMAGE_URL}${movie.poster_path}`
            : PLACEHOLDER_IMAGE
        }
        alt={movie.title}
        className="rounded-lg w-full h-auto"
      />
      <h2 className="text-xs lg:text-lg font-bold mt-2">
        {movie.title || movie.original_name}
      </h2>
      <div className="flex items-start gap-2">
        <StarRating rating={round(movie?.vote_average, 1)} />
      </div>
    </Card>
  );
}
