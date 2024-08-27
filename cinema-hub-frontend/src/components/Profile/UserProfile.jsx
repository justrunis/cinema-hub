import { fetchUser } from "../../api/http";
import { useQuery } from "@tanstack/react-query";
import { STALE_TIME } from "../../utils/constants";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";

export default function UserProfile() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorIndicator title="Failed to fetch user data" error={error} />;
  }

  return (
    <div className="max-h-100 overflow-y-auto w-full">
      <div className="grid grid-cols-1 text-primary">
        <p className="text-3xl font-bold text-center">{data.user.username}</p>
        <div className="flex justify-center">
          <img
            src="https://static.thenounproject.com/png/363639-200.png"
            alt="User Avatar"
            className="w-20 h-20 rounded-full content-center"
          />
        </div>
        <p className="text-lg font-light text-center">
          Email: {data.user.email}
        </p>
        <p className="text-lg font-light text-center">Role: {data.user.role}</p>
      </div>
    </div>
  );
}
