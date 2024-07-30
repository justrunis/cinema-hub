import { motion } from "framer-motion";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useSelector } from "react-redux";
import UserProfile from "../components/Profile/UserProfile";
import FavoriteMovies from "../components/Profile/FavoriteMovies";
import FavoriteShows from "../components/Profile/FavoriteShows";
import Watchlist from "../components/Profile/Watchlist";

export default function Profile() {
  document.title = "Profile";

  const [user] = useState({
    username: "JohnDoe",
    email: "johndoe@hotmail.com",
    role: "Admin",
    creationDate: "2021-09-01",
  });

  const { movies, shows } = useSelector((state) => state.favorites);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center max-h-screen text-base-content px-8 py-10"
    >
      <div className="flex flex-col items-center gap-2 bg-base-100 p-8 rounded-lg shadow-lg w-full max-w-3xl">
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
          </TabList>
          <TabPanel>
            <UserProfile user={user} />
          </TabPanel>
          <TabPanel>
            <FavoriteMovies movies={movies} />
          </TabPanel>
          <TabPanel>
            <FavoriteShows shows={shows} />
          </TabPanel>
          <TabPanel>
            <Watchlist />
          </TabPanel>
        </Tabs>
      </div>
    </motion.div>
  );
}
