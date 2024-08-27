import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";

const NotFoundImage =
  "https://ouch-cdn2.icons8.com/WntmAi6rfbE1lC05uqUrk_35GgPWHPtiaHentM8vKVg/rs:fit:368:225/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNjU0/LzQ1MjNjOGVjLTYz/ODAtNDZkOS1hODE0/LWU4ODg4YjhlOTBk/OC5zdmc.png";

export default function PageNotFound() {
  document.title = "Page Not Found";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex flex-1 flex-col items-center justify-center text-base-content"
    >
      <div className="flex flex-col items-center bg-base-100 p-8 mx-2 rounded-lg shadow-lg bg-base-100 border-4 border-primary">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          src={NotFoundImage}
          alt="Page Not Found"
          className="mb-8 w-100"
        />
        <Link to="/">
          <Button className="p-3 btn btn-primary text-primary-content rounded-lg min-h-[40px]">
            Go back to Home
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
