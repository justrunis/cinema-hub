import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SuggestedFriends from "./SuggestedFriends";
import FriendsList from "./FriendsList";
import FriendRequests from "./FriendRequests";
import { fetchUsersFriendsRequests } from "../../api/http";
import { STALE_TIME } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { useSelector } from "react-redux";

export default function FriendsTabs() {
  const token = useSelector((state) => state.login.token);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: () => fetchUsersFriendsRequests({ token }),
    staleTime: STALE_TIME,
  });

  const requestsCount = data?.length;

  return (
    <Tabs>
      <TabList className="flex justify-around w-full border-b-2 border-base-300 mb-4">
        <Tab
          className="p-2 cursor-pointer text-primary hover:text-accent"
          selectedClassName="font-bold !text-accent"
        >
          Friends list
        </Tab>
        <Tab
          className="p-2 cursor-pointer text-primary hover:text-accent"
          selectedClassName="font-bold !text-accent"
        >
          Suggested friends
        </Tab>
        <Tab
          className="p-2 cursor-pointer text-primary hover:text-accent"
          selectedClassName="font-bold !text-accent"
        >
          Friend requests{" "}
          {requestsCount > 0 && (
            <span className="badge badge-primary ms-1">{requestsCount}</span>
          )}
        </Tab>
      </TabList>
      <TabPanel>
        <FriendsList />
      </TabPanel>
      <TabPanel>
        <SuggestedFriends />
      </TabPanel>
      <TabPanel>
        <FriendRequests />
      </TabPanel>
    </Tabs>
  );
}
