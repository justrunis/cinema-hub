import { motion } from "framer-motion";
import logo from "../assets/png/logo-color.png";

const TMDB_LOGO_URL =
  "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";

export default function About() {
  document.title = "About";

  return (
    <motion.div
      className="max-h-screen flex flex-col justify-center items-center gap-8 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center gap-6 bg-base-100 p-8 rounded-lg shadow-lg max-w-3xl">
        <motion.img
          src={logo}
          alt="Cinema Hub"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-40 h-auto"
        />
        <motion.img
          src={TMDB_LOGO_URL}
          alt="The Movie Database"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-32 h-auto"
        />
        <h1 className="text-4xl font-bold text-center text-primary">
          About Cinema Hub
        </h1>
        <p className="text-lg text-center text-base-content">
          Cinema Hub is a movie and TV show database that lets you discover new
          movies and TV shows, get detailed information about them, and rate
          them. It's built with React, Tailwind CSS, and the TMDb API.
        </p>
        <p className="text-lg text-center text-base-content">
          With Cinema Hub, you can explore a vast collection of movies and TV
          shows from various genres and eras. Discover hidden gems, browse
          popular releases, and stay up-to-date with the latest trends in the
          entertainment industry.
        </p>
        <p className="text-lg text-center text-base-content">
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </p>
      </div>
    </motion.div>
  );
}
