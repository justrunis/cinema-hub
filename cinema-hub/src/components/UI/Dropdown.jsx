import { motion } from "framer-motion";
import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function Dropdown({ title = "Dropwdown", children, className }) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <>
      <button onClick={toggleDropdown} className={className}>
        <span>{title}</span>
        <span>{open ? <FaArrowUp /> : <FaArrowDown />}</span>
      </button>
      <motion.div
        className={`${open ? "block" : "hidden"} w-full`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}
