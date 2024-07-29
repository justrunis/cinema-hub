import { motion } from "framer-motion";
export default function ErrorIndicator({ title, message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-6 flex-grow bg-error text-error-content rounded-lg shadow-md border-4 border-warning"
    >
      <h1 className="text-3xl font-bold text-center uppercase">{title}</h1>
      <p className="text-xl text-center">{message}</p>
    </motion.div>
  );
}
