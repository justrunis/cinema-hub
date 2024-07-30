import { motion } from "framer-motion";

export default function ShowDetail({ title, delay, children }) {
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay }}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </motion.div>
  );
}
