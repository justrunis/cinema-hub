import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container text-center mx-auto"
    >
      <h1 className="text-4xl font-bold mt-10">Welcome to Cinema Hub</h1>
      <p className="mt-5 text-lg">
        The best place to find the latest movies and TV shows.
      </p>
    </motion.div>
  );
}
