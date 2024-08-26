import { motion } from "framer-motion";

export default function LoadingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <span className="loading loading-spinner loading-lg text-red-500"></span>
    </motion.div>
  );
}
