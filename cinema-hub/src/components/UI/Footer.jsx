import { motion } from "framer-motion";

const imageUrl =
  "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky inset-x-0 bottom-0 bg-primary text-primary-content text-center"
    >
      <div className="flex flex-row items-center justify-center text-center">
        <motion.img
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={imageUrl}
          alt="The Movie Database Logo"
          className="w-20 h-20 mr-4"
        />
        <p>&copy; {new Date().getFullYear()} Cinema Hub</p>
      </div>
    </motion.footer>
  );
}
