import { useSelector, useDispatch } from "react-redux";
import { friendsActions } from "../../store/slices/friends";
import Button from "../UI/Button";
import ConfirmationModal from "../UI/ConfirmationModal";
import { useState } from "react";
import SearchBar from "../UI/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { fetchUsersFriendsList } from "../../api/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { STALE_TIME } from "../../utils/constants";

export default function FriendsList() {
  const token = localStorage.getItem("cinema-hub-token");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["friendsList"],
    queryFn: () => fetchUsersFriendsList({ token }),
    staleTime: STALE_TIME,
  });

  console.log(data);

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [friend, setFriend] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(query) {
    setSearchQuery(query);
  }

  function handleViewProfile() {
    console.log("View Profile");
  }

  function handleUnfriend(friend) {
    setShowModal(true);
    setFriend(friend);
  }

  function handleUnfriendConfirm() {
    dispatch(friendsActions.removeFriend(friend));
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
      <p className="text-center text-lg font-semibold">
        You have no friends yet.
      </p>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto w-full mt-5">
      {showModal && (
        <ConfirmationModal
          title="Unfriend"
          message={`Are you sure you want to unfriend ${friend.name}?`}
          open={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleUnfriendConfirm}
        />
      )}
      <h1 className="text-2xl font-bold my-4 text-center">Friends List</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data &&
          data.map((friend) => (
            <div className="flex flex-col justify-center items-center gap-2 bg-gray-200 p-8 rounded-lg mr-4">
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
                  onClick={handleViewProfile}
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
