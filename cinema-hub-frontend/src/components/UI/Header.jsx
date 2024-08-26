import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavLinks from "../Header/NavLinks";
import MobileMenuButton from "../Header/MobileMenuButton";
import { useState } from "react";
import Logo from "../Header/Logo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary">
      <nav className="flex justify-between mx-10 items-center">
        <div className="flex items-center gap-4">
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
        <MobileMenuButton
          isMenuOpen={isOpen}
          toggleMenu={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="lg:hidden absolute top-20 left-0 right-0 bg-primary p-4"
          >
            <NavLinks />
          </motion.div>
        )}
      </nav>
    </header>
  );
}
