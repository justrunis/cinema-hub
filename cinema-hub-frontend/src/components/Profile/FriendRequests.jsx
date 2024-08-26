import { motion } from "framer-motion";

export default function FriendRequests() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center max-h-screen text-base-content px-8 py-10"
    >
      <div className="flex flex-col items-center gap-2 w-full min-w-3xl">
        <h1 className="text-3xl font-bold text-center text-primary">
          Friend Requests
        </h1>
        <p className="text-lg text-center text-base-content">
          You have no friend requests at the moment.
        </p>
      </div>
    </motion.div>
  );
}
