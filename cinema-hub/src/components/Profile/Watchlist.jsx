import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useState } from "react";
import MovieCard from "../Movies/MovieCard";
import ShowCard from "../Shows/ShowCard";
import SearchBar from "../UI/SearchBar";

export default function Watchlist() {
  const [searchQuery, setSearchQuery] = useState("");

  const movies = useSelector((state) => state.watchlist.movies);
  const shows = useSelector((state) => state.watchlist.shows);

  const allItems = [...movies, ...shows];

  const filteredItems = allItems.filter((item) =>
    (item.title || item.name).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uniqueItemsMap = new Map();
  filteredItems.forEach((item) => uniqueItemsMap.set(item.id, item));

  const uniqueFilteredItems = Array.from(uniqueItemsMap.values());

  function handleSearch(query) {
    setSearchQuery(query);
  }

  return (
    <div className="max-h-96 overflow-y-auto w-full">
      <SearchBar onSearch={handleSearch} className="w-full mb-4" />
      {uniqueFilteredItems.length === 0 ? (
        <div className="flex items-center justify-center text-center text-primary font-bold">
          <p className="text-center">No movies/shows found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {uniqueFilteredItems.map((item) =>
            item.title ? (
              <MovieCard key={item.id} movie={item} />
            ) : (
              <ShowCard key={item.id} show={item} />
            )
          )}
        </div>
      )}
    </div>
  );
}
