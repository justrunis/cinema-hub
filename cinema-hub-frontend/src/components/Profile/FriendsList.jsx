import { useDispatch } from "react-redux";
import Button from "../UI/Button";
import ConfirmationModal from "../UI/ConfirmationModal";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchUsersFriendsList,
  removeFriend,
  queryClient,
} from "../../api/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { STALE_TIME } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

export default function FriendsList() {
  const token = localStorage.getItem("cinema-hub-token");
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["friendsList"],
    queryFn: () => fetchUsersFriendsList({ token }),
    staleTime: STALE_TIME,
  });

  const { mutate: remove } = useMutation({
    mutationFn: removeFriend,
    onSuccess: () => {
      queryClient.invalidateQueries("friendsList");
    },
  });

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [friend, setFriend] = useState([]);

  function handleViewProfile(friend) {
    const id = friend.friend._id;
    navigate(`/friend/${id}`);
  }

  function handleUnfriend(friend) {
    setShowModal(true);
    setFriend(friend);
  }

  function handleUnfriendConfirm() {
    remove({ token, friendId: friend.friend._id });
    setShowModal(false);
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorIndicator title="An error occurred" message={error} />;
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full p-6 bg-base-300 rounded-lg">
        <p>You have no friends. Add some friends to see them here.</p>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto w-full mt-5">
      {showModal && (
        <ConfirmationModal
          title="Unfriend"
          message={`Are you sure you want to unfriend user ${friend.friend.username}?`}
          open={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleUnfriendConfirm}
        />
      )}
      <h1 className="text-2xl font-bold my-4 text-center">Friends List</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data &&
          data.map((friend) => (
            <div
              key={friend.friend._id}
              className="flex flex-col justify-center items-center gap-2 bg-gray-200 p-8 rounded-lg mr-4"
            >
              <h2 className="text-lg text-center font-semibold">
                {friend.friend.username}
              </h2>
              <img
                src="https://static.thenounproject.com/png/363639-200.png"
                alt={`${friend.username} Avatar`}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <Button
                  onClick={() => handleViewProfile(friend)}
                  className="btn btn-xs btn-accent text-accent-content"
                >
                  View Profile
                </Button>
                <Button
                  onClick={() => handleUnfriend(friend)}
                  className="btn btn-xs btn-primary text-primary-content"
                >
                  Unfriend
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
