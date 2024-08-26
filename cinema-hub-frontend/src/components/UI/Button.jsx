import { motion } from "framer-motion";

export default function Button({ children, onClick, className, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
