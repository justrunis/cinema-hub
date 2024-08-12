import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  document.title = "About";

  return (
    <motion.div
      className="max-h-screen flex flex-col justify-center items-center gap-8 p-8"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
    >
      <motion.div
        className="flex flex-col items-center gap-6 bg-base-100 p-8 rounded-lg shadow-lg max-w-3xl"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl font-bold text-center text-primary"
          variants={childVariants}
        >
          About Cinema Hub
        </motion.h1>
        <motion.p
          className="text-lg text-center text-base-content"
          variants={childVariants}
        >
          Cinema Hub is a movie and TV show database that lets you discover new
          movies and TV shows, get detailed information about them, and rate
          them. It's built with React, Tailwind CSS, and the TMDb API.
        </motion.p>
        <motion.p
          className="text-lg text-center text-base-content"
          variants={childVariants}
        >
          With Cinema Hub, you can explore a vast collection of movies and TV
          shows from various genres and eras. Discover hidden gems, browse
          popular releases, and stay up-to-date with the latest trends in the
          entertainment industry.
        </motion.p>
        <motion.p
          className="text-lg text-center text-base-content"
          variants={childVariants}
        >
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
