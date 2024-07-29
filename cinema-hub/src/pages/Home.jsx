import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen text-base-content px-4 py-10"
    >
      <h1 className="text-5xl font-extrabold mb-4 text-accent">
        Welcome to Cinema Hub
      </h1>
      <p className="text-xl mb-8 text-black">
        Your go-to destination for the latest movies and TV shows.
      </p>
      <div className="flex gap-4">
        <Link to="/movies">
          <Button>Browse Movies</Button>
        </Link>
        <Link to="/series">
          <Button> Browse TV Shows </Button>
        </Link>
      </div>
    </motion.div>
  );
}
