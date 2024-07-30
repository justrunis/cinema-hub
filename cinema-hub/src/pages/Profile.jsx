import { motion } from "framer-motion";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import UserProfile from "../components/Profile/UserProfile";
import FavoriteMovies from "../components/Profile/FavoriteMovies";
import FavoriteShows from "../components/Profile/FavoriteShows";
import Watchlist from "../components/Profile/Watchlist";
import FriendsList from "../components/Profile/FriendsList";
import SuggestedFriends from "../components/Profile/SuggestedFriends";

export default function Profile() {
  document.title = "Profile";

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center max-h-screen text-base-content px-8 py-10"
    >
      <div className="flex flex-col items-center gap-2 bg-base-100 p-8 rounded-lg shadow-lg w-full min-w-3xl">
        <Tabs>
          <TabList className="flex justify-around w-full border-b-2 border-base-300 mb-4">
            <Tab
              className="p-2 cursor-pointer text-primary hover:text-accent"
              selectedClassName="font-bold"
            >
              Profile
            </Tab>
            <Tab
              className="p-2 cursor-pointer text-primary hover:text-accent"
              selectedClassName="font-bold"
            >
              Favorite Movies
            </Tab>
            <Tab
              className="p-2 cursor-pointer text-primary hover:text-accent"
              selectedClassName="font-bold"
            >
              Favorite Shows
            </Tab>
            <Tab
              className="p-2 cursor-pointer text-primary hover:text-accent"
              selectedClassName="font-bold"
            >
              Watchlist
            </Tab>
            <Tab
              className="p-2 cursor-pointer text-primary hover:text-accent"
              selectedClassName="font-bold"
            >
              Friends list
            </Tab>
          </TabList>
          <TabPanel>
            <UserProfile />
          </TabPanel>
          <TabPanel>
            <FavoriteMovies />
          </TabPanel>
          <TabPanel>
            <FavoriteShows />
          </TabPanel>
          <TabPanel>
            <Watchlist />
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FriendsList />
              <SuggestedFriends />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </motion.div>
  );
}
