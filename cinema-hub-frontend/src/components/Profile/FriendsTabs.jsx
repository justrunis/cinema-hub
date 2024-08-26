import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SuggestedFriends from "./SuggestedFriends";
import FriendsList from "./FriendsList";
import FriendRequests from "./FriendRequests";

export default function FriendsTabs() {
  return (
    <Tabs>
      <TabList className="flex justify-around w-full border-b-2 border-base-300 mb-4">
        <Tab
          className="p-2 cursor-pointer text-primary hover:text-accent"
          selectedClassName="font-bold text-accent"
        >
          Suggested Friends
        </Tab>
        <Tab
          className="p-2 cursor-pointer text-primary hover:text-accent"
          selectedClassName="font-bold text-accent"
        >
          Friends list
        </Tab>
        <Tab
          className="p-2 cursor-pointer text-primary hover:text-accent"
          selectedClassName="font-bold text-accent"
        >
          Friends requests
        </Tab>
      </TabList>
      <TabPanel>
        <SuggestedFriends />
      </TabPanel>
      <TabPanel>
        <FriendsList />
      </TabPanel>
      <TabPanel>
        <FriendRequests />
      </TabPanel>
    </Tabs>
  );
}
