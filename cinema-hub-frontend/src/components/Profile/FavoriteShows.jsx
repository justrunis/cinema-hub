import ShowCard from "../Shows/ShowCard";
import { useState } from "react";
import SearchBar from "../UI/SearchBar";
import { useSelector } from "react-redux";

export default function FavoriteShows() {
  const { shows } = useSelector((state) => state.favorites);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredShows = shows.filter((show) =>
    show.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleSearch(query) {
    setSearchQuery(query);
  }

  return (
    <div className="max-h-100 overflow-y-auto w-full">
      <SearchBar onSearch={handleSearch} className="w-full mb-4" />

      {filteredShows.length === 0 ? (
        <div className="flex items-center justify-center text-center text-primary font-bold">
          <p>No favorite shows found</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
          {filteredShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      )}
    </div>
  );
}
