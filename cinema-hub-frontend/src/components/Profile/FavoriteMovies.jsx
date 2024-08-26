import MovieCard from "../Movies/MovieCard";
import { useState } from "react";
import SearchBar from "../UI/SearchBar";
import { useSelector } from "react-redux";

export default function FavoriteMovies() {
  const { movies } = useSelector((state) => state.favorites);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleSearch(query) {
    setSearchQuery(query);
  }

  return (
    <div className="max-h-100 overflow-y-auto w-full">
      <SearchBar onSearch={handleSearch} className="w-full mb-4" />

      {filteredMovies.length === 0 ? (
        <div className="flex items-center justify-center text-center text-primary font-bold">
          <p className="text-center">No favorite movies found</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
