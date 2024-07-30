import ShowCard from "../Shows/ShowCard";
import { useState } from "react";
import SearchBar from "../UI/SearchBar";

export default function FavoriteShows({ shows }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShows = shows.filter((show) =>
    show.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleSearch(query) {
    setSearchQuery(query);
  }

  return (
    <div className="max-h-96 overflow-y-auto w-full">
      <SearchBar onSearch={handleSearch} className="w-full mb-4" />

      {filteredShows.length === 0 ? (
        <div className="flex items-center justify-center text-center text-primary font-bold">
          <p>No favorite shows found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      )}
    </div>
  );
}
