import { motion } from "framer-motion";

export default function Button({ children, onClick, className, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`p-2 bg-base-100 text-base-content rounded-lg min-h-[40px] ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
