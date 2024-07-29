import { motion } from "framer-motion";
import logo from "../../assets/png/favicon.png";

export default function Logo({ className }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.img
        src={logo}
        alt="logo"
        className={className}
        width={80}
        height={80}
      />
      <h2 className="ml-2">Cinema Hub</h2>
    </motion.div>
  );
}
