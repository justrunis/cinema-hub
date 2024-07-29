import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavLinks from "../Header/NavLinks";
import MobileMenuButton from "../Header/MobileMenuButton";
import { useState } from "react";
import Logo from "../Header/Logo";

const TMDB_LOGO_URL =
  "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary">
      <nav className="flex justify-between mx-10 items-center">
        <div className="flex items-center gap-4">
          <img src={TMDB_LOGO_URL} alt="The Movie Database" className="h-10" />
          <Link
            to="/"
            className="flex items-center justify-center text-2xl font-bold text-accent"
          >
            <Logo className="inline" />
          </Link>
        </div>
        <div className="hidden lg:flex justify-self-end ">
          <NavLinks />
        </div>
        <MobileMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="lg:hidden absolute top-16 left-0 right-0 bg-base-300"
          >
            <NavLinks />
          </motion.div>
        )}
      </nav>
    </header>
  );
}
