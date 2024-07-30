import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";

export default function Home() {
  document.title = "Home";

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
          Welcome to Cinema Hub
        </h1>
        <p className="text-xl mb-8 text-black text-center">
          Your go-to destination for the latest movies and TV shows.
        </p>
        <div className="flex gap-4">
          <Link to="/movies">
            <Button className="p-3 btn bg-primary text-primary-content rounded-lg min-h-[40px] hover:bg-accent">
              Browse Movies
            </Button>
          </Link>
          <Link to="/shows">
            <Button className="p-3 btn bg-primary text-primary-content rounded-lg min-h-[40px] hover:bg-accent">
              Browse TV Shows
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
