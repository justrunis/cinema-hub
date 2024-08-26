import { useSelector, useDispatch } from "react-redux";
import { friendsActions } from "../../store/slices/friends";
import Button from "../UI/Button";
import ConfirmationModal from "../UI/ConfirmationModal";
import { useState } from "react";
import SearchBar from "../UI/SearchBar";

export default function FriendsList() {
  const friends = useSelector((state) => state.friends.friends);

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [friend, setFriend] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <SearchBar
        onSearch={handleSearch}
        className="w-full"
        placeHolder="Search friends..."
      />
      <h1 className="text-2xl font-bold my-4 text-center">Friends List</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredFriends.map((friend) => (
          <div className="flex flex-col justify-center items-center gap-2 bg-gray-200 p-8 rounded-lg mr-4">
            <h2 className="text-lg text-center font-semibold">{friend.name}</h2>
            <img
              src="https://static.thenounproject.com/png/363639-200.png"
              alt={`${friend.name} Avatar`}
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
