import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";

export default function Favorites() {
  document.title = "Favorites";

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center max-h-screen text-base-content px-8 py-10"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center bg-base-100 p-8 rounded-lg shadow-lg max-w-3xl"
      >
        <h1 className="text-5xl font-extrabold mb-4 text-accent text-center">
          Your Favorites
        </h1>
        <p className="text-xl mb-8 text-black text-center">
          Your favorite movies and TV shows will appear here.
        </p>
        <div className="flex gap-4">
          <Link to="/movies">
            <Button>Browse Movies</Button>
          </Link>
          <Link to="/shows">
            <Button> Browse TV Shows </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
