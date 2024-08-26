import { motion } from "framer-motion";
import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Button from "../UI/Button";

export default function Dropdown({ title = "Dropwdown", children, className }) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className={className}>
      <Button
        onClick={toggleDropdown}
        className="flex justify-center items-center gap-2 p-4 text-primary hover:text-accent"
      >
        <span>{title}</span>
        <span>{open ? <FaArrowUp /> : <FaArrowDown />}</span>
      </Button>
      <motion.div
        className={`${open ? "block" : "hidden"} w-full`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
