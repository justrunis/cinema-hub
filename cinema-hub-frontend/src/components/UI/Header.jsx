import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import NavLinks from "../Header/NavLinks";
import MobileMenuButton from "../Header/MobileMenuButton";
import { useState } from "react";
import Logo from "../Header/Logo";

export default function Header({ token }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary">
      <nav className="flex justify-between items-center mx-10">
        {/* Logo */}
        <div className="flex items-center gap-4 mx-5">
          <Link
            to="/"
            className="flex items-center justify-center text-2xl font-bold text-accent"
          >
            <Logo className="inline" />
          </Link>
        </div>

        <div className="hidden lg:flex flex-1 justify-between items-center">
          <NavLinks token={token} />
        </div>

        <MobileMenuButton
          isMenuOpen={isOpen}
          toggleMenu={() => setIsOpen(!isOpen)}
        />

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="lg:hidden absolute top-20 left-0 right-0 bg-primary p-4 z-50"
            >
              <NavLinks token={token} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
