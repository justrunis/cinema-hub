import { motion } from "framer-motion";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import UserProfile from "../components/Profile/UserProfile";
import FavoriteMovies from "../components/Profile/FavoriteMovies";
import FavoriteShows from "../components/Profile/FavoriteShows";
import Watchlist from "../components/Profile/Watchlist";
import FriendsTabs from "../components/Profile/FriendsTabs";

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
              selectedClassName="font-bold text-accent"
            >
              Profile
            </Tab>
            <Tab
              className="p-2 cursor-pointer text-primary hover:text-accent"
              selectedClassName="font-bold text-accent"
            >
              Favorite Movies
            </Tab>
            <Tab
              className="p-2 cursor-pointer text-primary hover:text-accent"
              selectedClassName="font-bold text-accent"
            >
              Favorite Shows
            </Tab>
            <Tab
              className="p-2 cursor-pointer text-primary hover:text-accent"
              selectedClassName="font-bold text-accent"
            >
              Watchlist
            </Tab>
            <Tab
              className="p-2 cursor-pointer text-primary hover:text-accent"
              selectedClassName="font-bold text-accent"
            >
              Friends
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
            <FriendsTabs />
          </TabPanel>
        </Tabs>
      </div>
    </motion.div>
  );
}
