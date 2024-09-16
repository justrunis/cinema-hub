import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import icon from "../assets/png/logo-no-background.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.3,
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
      className="flex flex-col justify-center items-center p-8"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
    >
      <motion.div
        className="flex flex-col items-center gap-8 bg-white text-base-content p-12 rounded-xl shadow-2xl max-w-4xl"
        variants={containerVariants}
      >
        <motion.img
          src={icon}
          alt="Cinema Hub"
          className="w-1/2 h-1/2"
          variants={childVariants}
        />
        <motion.p
          className="text-lg text-center leading-relaxed"
          variants={childVariants}
        >
          Cinema Hub is your ultimate destination to discover new movies and TV
          shows. Built with React, Tailwind CSS, and powered by the TMDb API, it
          offers you detailed information, ratings, and insights into your
          favorite films and shows.
        </motion.p>
        <motion.p
          className="text-lg text-center leading-relaxed"
          variants={childVariants}
        >
          Explore a vast collection of content from different genres and eras.
          Whether you're looking for hidden gems or popular releases, Cinema Hub
          helps you stay up-to-date with the latest entertainment trends.
        </motion.p>
        <motion.p
          className="text-lg text-center leading-relaxed"
          variants={childVariants}
        >
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </motion.p>
        <motion.div
          className="flex justify-center items-center gap-4"
          variants={childVariants}
        >
          <Link to="/movies">
            <Button className="btn btn-primary text-primary-content">
              Explore Now
            </Button>
          </Link>
          <a href="https://www.themoviedb.org/">
            <Button className="btn btn-primary text-primary-content">
              To TMDB
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
