import { useSelector } from "react-redux";
import { fetchUser } from "../../api/http";
import { useQuery } from "@tanstack/react-query";
import { STALE_TIME } from "../../utils/constants";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { motion } from "framer-motion";
import Button from "../UI/Button";
import { makeFirstLetterUpperCase } from "../../utils/formatting";

export default function UserProfile() {
  const token = useSelector((state) => state.login.token);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser({ token }),
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorIndicator title="Failed to fetch user data" error={error} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-4 w-full h-full p-6 bg-base-200 rounded-lg"
    >
      {/* Cover Photo */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-48 bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg mb-4 relative"
      >
        <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
          <motion.img
            src={
              data?.user?.avatar ||
              "https://static.thenounproject.com/png/363639-200.png"
            }
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-xl text-center"
      >
        <p className="text-3xl font-bold text-primary mb-2">
          {data.user.username}
        </p>
        <p className="text-lg font-light text-accent mb-4">
          Email: {data.user.email}
        </p>
        <p className="text-lg font-light text-accent mb-4">
          Role: {makeFirstLetterUpperCase(data.user.role)}
        </p>
        <p className="text-sm text-gray-500">
          Joined: {new Date(data.user.createdAt).toLocaleDateString()}
        </p>

        {/* Edit Profile Button */}
        <Button
          className="p-3 btn btn-primary text-primary-content rounded-lg min-h-[40px]"
          onClick={() => {}}
        >
          Edit Profile
        </Button>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-xl mt-4"
      >
        <p className="text-xl font-bold mb-2">Bio</p>
        <p className="text-base font-light text-accent">
          {data.user.bio || "This user hasn't added a bio yet."}
        </p>
      </motion.div>
    </motion.div>
  );
}
