import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchUsersFriendsRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  queryClient,
} from "../../api/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { STALE_TIME } from "../../utils/constants";
import Button from "../UI/Button";

export default function FriendRequests() {
  const token = localStorage.getItem("cinema-hub-token");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["friendsRequests"],
    queryFn: () => fetchUsersFriendsRequests({ token }),
    staleTime: STALE_TIME,
  });

  const { mutate: accept } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries("friendsRequests");
    },
  });

  const { mutate: reject } = useMutation({
    mutationFn: rejectFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries("friendsRequests");
    },
  });

  function handleAcceptFriendRequest(id) {
    accept({ token, friendId: id });
  }

  function handleRejectFriendRequest(id) {
    reject({ token, friendId: id });
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorIndicator title="An error occurred" message={error} />;
  }

  if (data.length === 0) {
    return (
      <p className="text-center text-lg font-semibold">
        You have no friend requests.
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full mt-5"
    >
      {data.map((user) => (
        <div
          key={user.user._id}
          className="flex items-center justify-between bg-base-200 p-4 rounded-lg"
        >
          <div className="flex items-center">
            <img
              src={
                user.avatar ||
                "https://static.thenounproject.com/png/363639-200.png"
              }
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <p className="ml-2">{user.user.username}</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => handleAcceptFriendRequest(user.user._id)}
              className="btn btn-success"
            >
              Accept
            </Button>
            <Button
              onClick={() => handleRejectFriendRequest(user.user._id)}
              className="btn btn-error"
            >
              Reject
            </Button>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
