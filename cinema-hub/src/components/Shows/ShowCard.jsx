import { motion } from "framer-motion";
import Card from "../UI/Card";
import StarRating from "../Movies/StarRating";
import { IMAGE_URL, PLACEHOLDER_IMAGE } from "../../utils/constants";
import { round } from "../../utils/formatting";
import { useNavigate } from "react-router-dom";

export default function ShowCard({ show }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/shows/${show.id}`);
  }

  return (
    <Card
      key={show.id}
      className="flex flex-col justify-center items-center bg-base-100 p-8 rounded-lg shadow-md"
      onClick={handleClick}
    >
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src={
          show.poster_path
            ? `${IMAGE_URL}${show.poster_path}`
            : PLACEHOLDER_IMAGE
        }
        alt={show.name || show.original_name}
        className="rounded-lg w-full h-auto"
      />
      <h2 className="text-xl font-bold mt-2">
        {show.name || show.original_name}
      </h2>
      <div className="flex items-center gap-2">
        <StarRating rating={show.vote_average} />
      </div>
    </Card>
  );
}
