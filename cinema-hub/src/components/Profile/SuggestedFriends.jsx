import { useSelector, useDispatch } from "react-redux";
import { friendsActions } from "../../store/slices/friends";
import Button from "../UI/Button";
import { ALL_USERS } from "../../utils/constants";
import SearchBar from "../UI/SearchBar";
import { useState } from "react";

export default function SuggestedFriends() {
  const friends = useSelector((state) => state.friends.friends);

  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const suggestedFriends = ALL_USERS.filter(
    (user) => !friends.find((friend) => friend.id === user.id)
  ).filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleSearch(query) {
    setSearchQuery(query);
  }

  function handleAddFriend(friend) {
    dispatch(friendsActions.addFriend(friend));
  }

  return (
    <div className="max-h-96 overflow-y-auto w-full mt-5">
      <SearchBar
        onSearch={handleSearch}
        className="w-full"
        placeHolder="Search suggested friends..."
      />
      <h1 className="text-2xl font-bold my-4">Suggested friends</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {suggestedFriends.map((friend) => (
          <div
            key={friend.id}
            className="flex flex-col justify-center items-center gap-2 bg-gray-200 p-8 rounded-lg"
          >
            <h2 className="text-lg font-semibold text-center">{friend.name}</h2>
            <img
              src="https://static.thenounproject.com/png/363639-200.png"
              alt={`${friend.name} Avatar`}
              className="w-10 h-10 rounded-full"
            />
            <Button
              className="btn btn-xs btn-primary text-primary-content"
              onClick={() => handleAddFriend(friend)}
            >
              Add friend
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
