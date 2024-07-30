import { motion } from "framer-motion";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import { round } from "../../utils/formatting";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function StarRating({
  rating,
  className = "flex items-center justify-center gap-5",
}) {
  const { height, width } = useWindowDimensions();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {width > 1024 && (
        <Rating
          start={0}
          stop={10}
          initialRating={rating}
          readonly
          fullSymbol={<FaStar className="text-yellow-400" />}
          emptySymbol={<FaRegStar className="text-yellow-400" />}
        />
      )}
      <span className="text-accent text-sm font-bold">
        {round(rating, 1)}/10
      </span>
    </motion.div>
  );
}
