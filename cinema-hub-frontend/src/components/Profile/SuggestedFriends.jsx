import Button from "../UI/Button";
import {
  fetchUserSuggestedFriends,
  addFriend,
  queryClient,
} from "../../api/http";
import { useQuery, useMutation } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { STALE_TIME } from "../../utils/constants";
import { formatDate } from "../../utils/formatting";

export default function SuggestedFriends() {
  const token = localStorage.getItem("cinema-hub-token");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["suggestedFriends"],
    queryFn: () => fetchUserSuggestedFriends({ token }),
    staleTime: STALE_TIME,
  });

  const { mutate } = useMutation({
    mutationFn: addFriend,
    onSuccess: () => {
      queryClient.invalidateQueries("suggestedFriends");
    },
  });

  function handleAddFriend(friend) {
    mutate({ token, friendId: friend._id });
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
        <p>You have no suggested friends.</p>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto w-full mt-5">
      <h1 className="text-2xl font-bold my-4 text-center">Suggested friends</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data.map((friend) => (
          <div
            key={friend._id}
            className="flex flex-col justify-center items-center gap-2 bg-gray-200 p-8 rounded-lg"
          >
            <h2 className="text-lg font-semibold text-center">
              {friend.username}
            </h2>
            <img
              src="https://static.thenounproject.com/png/363639-200.png"
              alt={`${friend.name} Avatar`}
              className="w-10 h-10 rounded-full"
            />
            <p>
              Member since:{" "}
              <span className="font-semibold">
                {formatDate(friend.createdAt)}
              </span>
            </p>
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
