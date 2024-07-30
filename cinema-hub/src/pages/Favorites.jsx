import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MovieCard from "../components/Movies/MovieCard";
import ShowCard from "../components/Shows/ShowCard";

export default function Favorites() {
  document.title = "Favorites";

  const { movies, shows } = useSelector((state) => state.favorites);

  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center max-h-screen text-base-content px-8 py-10"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center gap-8 bg-base-100 p-8 rounded-lg shadow-lg max-w-3xl"
      >
        <h1 className="text-5xl font-extrabold mb-4 text-accent text-center">
          Favorites
        </h1>
        <Tabs>
          <TabList>
            <Tab>Movies</Tab>
            <Tab>TV Shows</Tab>
          </TabList>
          <TabPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {movies.length === 0 ? (
                <div className="text-center text-xl text-base-content">
                  No favorite movies added
                </div>
              ) : (
                <>
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </>
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {shows.length === 0 ? (
                <div className="text-center text-xl text-base-content">
                  No favorite shows added
                </div>
              ) : (
                <>
                  {shows.map((show) => (
                    <ShowCard key={show.id} show={show} />
                  ))}
                </>
              )}
            </div>
          </TabPanel>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
